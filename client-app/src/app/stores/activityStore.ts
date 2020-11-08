import {
  observable,
  action,
  computed,
  runInAction,
  reaction,
  toJS,
} from "mobx";
import { SyntheticEvent } from "react";
import { IActivity, IUserActivitiesUnreadDto } from "../models/activity";
import agent from "../api/agent";
import "mobx-react-lite/batchingForReactDom";
import { history } from "../..";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";
import {
  setActivityProps,
  createAttendee,
  covertDateUTCtoLocal,
} from "../common/util/util";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

const LIMIT = 10;

export default class ActivityStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      //the condition for the reaction to run
      () => this.predicate.keys(),
      //actions to take i.e. reset state and then pull latest `
      () => {
        this.page = 0;
        this.activityRegistry.clear();
        this.loadActivities();
      }
    );
  }

  @observable activityRegistry = new Map();
  @observable loadingInitial = false;
  @observable activity: IActivity | null = null;
  @observable submitting = false;
  @observable target = "";
  @observable loading = false;
  @observable activityCount = 0;
  @observable page = 0;
  @observable predicate = new Map();
  @observable onlineUsers: { [id: string]: Set<string> } = {};
  @observable unreadActivitiesRegistry = new Map();
  @observable unreadActivitiesArray: Array<IUserActivitiesUnreadDto> = [];
  @observable testBool: boolean = false;
  // activities: IActivity[];

  @action setPredicate = (predicate: string, value: string | Date) => {
    this.predicate.clear();
    if (predicate !== "all") {
      this.predicate.set(predicate, value);
    }
  };

  @computed get axiosParams() {
    const params = new URLSearchParams();
    params.append("limit", String(LIMIT));
    params.append("offset", `${this.page ? this.page * LIMIT : 0}`);

    this.predicate.forEach((value, key) => {
      if (key === "startDate") {
        params.append(key, value.toISOString());
      } else {
        params.append(key, value);
      }
    });
    return params;
  }

  @computed get totalPages() {
    return Math.ceil(this.activityCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  };

  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(
      Array.from(this.activityRegistry.values())
    );
  }

  //FIXME:
  @computed get unreadActivitiesByActivity() {
    return this.groupUerActivitiesbyActivity(
      Array.from(this.unreadActivitiesArray.values())
    );
  }

  //only loaded on the activity details page, or else this is null
  @observable.ref hubConnection: HubConnection | null = null;

  @action createHubConnection = (activityId: string) => {
    //configure the hubconnection
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_API_CHAT_URL!, {
        accessTokenFactory: () => this.rootStore.commonStore.token!,
      })
      .configureLogging(LogLevel.Information)
      .build();

    if (this.hubConnection?.state === "Disconnected") {
      //start the connection
      this.hubConnection
        .start()
        .then(() => {
          console.log("Attempting to join group");
          if (this.hubConnection!.state === "Connected")
            this.hubConnection?.invoke("AddToGroup", activityId);
        })
        .then(() => console.log(this.hubConnection?.state))
        .catch((error) =>
          console.log("Error establishing connection: ", error)
        );

      //configure the hubconnection what to do when it recieves a comment
      //"RecieveComment" is in the ChatHub.cs
      this.hubConnection.on("RecieveComment", (comment) => {
        //add the comment to the comments array inside the activity object
        runInAction(() => this.activity!.comments.push(comment));
      });
    }

    this.hubConnection.on("Send", (message: string) => {
      // toast.info(message);TODO:uncomment if you want to get toasts
      if (message.includes("online")) {
        if (this.onlineUsers[this.activity?.id!] == null) {
          let mySet = new Set<string>();
          runInAction(() => {
            this.onlineUsers[this.activity?.id!] = mySet.add(
              message.split(">>")[0].trim()
            );
          });
        } else {
          runInAction(() => {
            this.onlineUsers[this.activity?.id!].add(
              message.split(">>")[0].trim()
            );
          });
        }
      }
      if (message.includes("offline")) {
        runInAction(() => {
          this.onlineUsers[this.activity?.id!].delete(
            message.split(">>")[0].trim()
          );
        });
      }
      console.log(
        Array.from(this.onlineUsers[Object.keys(this.onlineUsers)[0]])
      );
      console.log(Array.from(this.onlineUsers[this.activity?.id!]));
    });
  };

  @action stopHubConnection = () => {
    if (this.hubConnection?.state === "Connected") {
      this.hubConnection!.invoke("RemoveFromGroup", this.activity!.id)
        .then(() => {
          this.hubConnection!.stop();
        })
        .then(() => console.log("Connection stopped"))
        .catch((err) => console.log("error", err));
    }
  };

  //to match the create comment command , the property in values should match
  @action addComment = async (values: any) => {
    values.ActivityId = this.activity!.id;
    try {
      //this SendComment must match directly with the
      await this.hubConnection!.invoke("SendComment", values);
    } catch (error) {
      console.log(error);
    }
  };

  groupActivitiesByDate(activities: IActivity[]) {
    const sortedActivities = activities.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date.toISOString().split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: IActivity[] })
    );
  }

  groupUerActivitiesbyActivity(unreadActivities: IUserActivitiesUnreadDto[]) {
    const sortedUserActivities = unreadActivities.sort(
      (a, b) =>
        new Date(a.activityDateTime).getDate() -
        new Date(b.activityDateTime).getDate()
    );

    return Object.entries(
      sortedUserActivities.reduce((unreadActivities, unreadAcivity) => {
        unreadActivities[unreadAcivity.activityName] = unreadActivities[
          unreadAcivity.activityName
        ]
          ? [...unreadActivities[unreadAcivity.activityName], unreadAcivity]
          : [unreadAcivity];
        return unreadActivities;
      }, {} as { [key: string]: IUserActivitiesUnreadDto[] })
    );
  }

  //need an action that modifies the state of an observable
  //implemented using async await
  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activitiesEnvelope = await agent.Activities.list(this.axiosParams);
      const { activities, activityCount } = activitiesEnvelope;
      runInAction("loading activities", () => {
        activities.forEach((activity) => {
          activity.date = covertDateUTCtoLocal(new Date(activity.date));
          setActivityProps(activity, this.rootStore.userStore.user!);
          this.activityRegistry.set(activity.id, activity);
        });
        this.activityCount = activityCount;
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log("activity error", error);
      runInAction("load activities error", () => {
        this.loadingInitial = false;
        history.push("/");
      });
    }
  };

  @action loadUnreadApprovals = async () => {
    this.loadingInitial = true;
    try {
      let unreadActivities = await agent.Activities.unread();
      runInAction(() =>
        this.unreadActivitiesArray.splice(0, this.unreadActivitiesArray.length)
      );
      runInAction(() => {
        unreadActivities.map((a: IUserActivitiesUnreadDto) => {
          this.unreadActivitiesArray.push(a);
        });
      });

      //Broken
      // this.unreadActivitiesArray.forEach(
      //   (unreadActivity: IUserActivitiesUnreadDto) => {
      //     runInAction("loading unreads", () => {
      //       this.unreadActivitiesRegistry.set(
      //         unreadActivity.activityId,
      //         unreadActivity
      //       );
      //       console.log("inside action again");
      //       console.log(this.unreadActivitiesRegistry);
      //       this.testBool = true;
      //     });
      //   }
      // );
      runInAction(
        "setting load inital to false",
        () => (this.loadingInitial = false)
      );
      // })
    } catch (error) {
      console.log("unred error", error);
      runInAction("load unread activities error", () => {
        this.loadingInitial = false;
        history.push("/");
      });
    }
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
      //use the toJS method to convert the observable to a plain JS object
      return toJS(activity);
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction("getting activity", () => {
          setActivityProps(activity, this.rootStore.userStore.user!);
          activity.date = covertDateUTCtoLocal(activity.date);
          this.activity = activity;
          this.activityRegistry.set(activity.id, activity);
          this.loadingInitial = false;
        });
        return activity;
      } catch (error) {
        runInAction("get activitiy error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearActivity = () => {
    this.activity = null;
  };

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      const attendee = createAttendee(this.rootStore.userStore.user!);
      attendee.isHost = true;
      let attendees = [];
      attendees.push(attendee);
      activity.attendees = attendees;
      activity.comments = [];
      activity.isHost = true;
      runInAction("creating activity", () => {
        this.activityRegistry.set(activity.id, activity);
        //activity.push is simila r to adding it to the registry set , observable map above ^
        //this.activities.push(activity);
        this.submitting = false;
        history.push(`/activities/${activity.id}`);
      });
    } catch (error) {
      runInAction("create activity error", () => {
        this.submitting = false;
      });
      console.log(error.response);
      toast.error("Problem Submitting data");
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      console.log("POSTing activity");
      console.log(activity);
      await agent.Activities.update(activity);
      runInAction("editing an activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      runInAction("edit activity error", () => {
        this.submitting = false;
        console.log(error);
        toast.error("Problem Submitting data");
      });
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction("deleting activity", () => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("delete activity error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };

  @action attendActivity = async () => {
    const attendee = createAttendee(this.rootStore.userStore.user!);
    this.loading = true;
    try {
      await agent.Activities.attend(this.activity!.id);
      runInAction(() => {
        if (this.activity) {
          this.activity.attendees.push(attendee);
          this.activity.isGoing = true;
          this.activityRegistry.set(this.activity.id, this.activity);
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("Problem signing upto activity.");
    }
  };

  @action cancelAttendance = async () => {
    this.loading = true;
    try {
      await agent.Activities.unattend(this.activity!.id);
      runInAction(() => {
        if (this.activity) {
          this.activity.attendees = this.activity.attendees.filter(
            (a) => a.username !== this.rootStore.userStore.user!.username
          );
          this.activity.isGoing = false;
          this.activityRegistry.set(this.activity.id, this.activity);
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("Problem cancelling attendance.");
    }
  };

  @action approveAttendance = async (
    event: SyntheticEvent<HTMLButtonElement>,
    unreadActvity: IUserActivitiesUnreadDto
  ) => {
    this.loading = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.approve(
        unreadActvity.activityId,
        unreadActvity.requestorUserName
      );
      runInAction(() => {
        if (this.unreadActivitiesArray) {
          this.unreadActivitiesArray = this.unreadActivitiesArray.filter(
            (a) => a !== unreadActvity
          );
          this.loading = false;
          this.target = "";
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
        this.target = "";
      });
      toast.error("Problem approving attendance.");
    }
  };

  @action rejectAttendance = async (
    event: SyntheticEvent<HTMLButtonElement>,
    unreadActvity: IUserActivitiesUnreadDto
  ) => {
    this.loading = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.reject(
        unreadActvity.activityId,
        unreadActvity.requestorUserName
      );
      runInAction(() => {
        if (this.unreadActivitiesArray) {
          this.unreadActivitiesArray = this.unreadActivitiesArray.filter(
            (a) => a !== unreadActvity
          );
          this.loading = false;
          this.target = "";
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
        this.target = "";
      });
      toast.error("Problem approving attendance.");
    }
  };
}
