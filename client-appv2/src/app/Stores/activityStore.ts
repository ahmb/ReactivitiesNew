import { format } from "date-fns";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import {
  Activity,
  ActivityFormValues,
  ActivityDetails,
  ActivityFormValuesNew,
  ApprovalStatus,
} from "../models/activity";
import { Pagination, PagingParams } from "../models/pagination";
import { Profile } from "../models/profile";
import { store } from "./store";

export default class ActivityStore {
  activities: Activity[] = [];
  activityRegistry = new Map<string, Activity>();
  selectedActivity: ActivityDetails | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  predicate = new Map().set("all", true);

  uploadingPicture = false;

  constructor() {
    // makeObservable(this, {
    //     title: observable,
    //     setTitle:action
    // })
    //starts observing all the object properties
    makeAutoObservable(this);

    reaction(
      () => this.predicate.keys(),
      () => {
        this.pagingParams = new PagingParams();
        this.activityRegistry.clear();
        this.loadActivities();
      }
    );
  }

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setPredicate = (predicate: string, value: string | Date) => {
    const resetPredicate = () => {
      this.predicate.forEach((value, key) => {
        if (key !== "startDate") this.predicate.delete(key);
      });
    };
    switch (predicate) {
      case "all":
        resetPredicate();
        this.predicate.set("all", true);
        break;
      case "isGoing":
        resetPredicate();
        this.predicate.set("isGoing", true);
        break;
      case "isHost":
        resetPredicate();
        this.predicate.set("isHost", true);
        break;
      case "startDate":
        this.predicate.delete("startDate");
        this.predicate.set("startDate", value);
    }
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    this.predicate.forEach((value, key) => {
      if (key === "startDate") {
        params.append(key, (value as Date).toISOString());
      } else {
        params.append(key, value);
      }
    });
    return params;
  }

  //this is a computed property
  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }

  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = format(activity.date!, "dd MMM yyyy");
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.Activities.list(this.axiosParams);
      runInAction(() => {
        result.data.forEach((activity) => {
          this.setActivity(activity);
        });
        this.setPagination(result.pagination);
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  loadActivity = async (id: string) => {
    // let activity = this.getActivity(id);
    // if (activity) {
    //   this.selectedActivity = activity;
    //   return activity;
    // } else {
    this.loadingInitial = true;
    try {
      let activity = await agent.Activities.details(id);
      this.setActivity(activity);
      runInAction(() => {
        this.selectedActivity = activity;
      });
      this.setLoadingInitial(false);
      return activity;
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
    // }
  };

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  //TODO: fix this to add activity back to the registry
  private setActivity = (activity: Activity | ActivityDetails) => {
    const user = store.userStore.user;
    // check if the users authenticated and logged into the application
    if (user) {
      activity.isGoing =
        "attendees" in activity
          ? activity.attendees?.some((a) => a.username === user.username)
          : activity.isGoing;
      // activity.isGoing = activity.isGoing;
      activity.isHost = activity.hostUsername === user.username;
      // activity.host = activity.hostUsername;.attendees?.find(
      //   (x) => x.username === activity.hostUsername
      // );
    }
    activity.date = new Date(activity.date!);
    // activity.endDate = new Date(activity.endDate!);
    this.activityRegistry.set(activity.id, activity);
  };

  createActivity = async (activityFormValues: ActivityFormValues) => {
    const user = store.userStore.user;
    const attendee = new Profile(user!);
    try {
      await agent.Activities.create(activityFormValues);
      const newActivity = new ActivityDetails(activityFormValues);
      newActivity.hostUsername = user!.username;
      // newActivity.attendees = [attendee];
      this.setActivity(newActivity);

      runInAction(() => {
        this.selectedActivity = newActivity;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.selectedActivity = undefined;
        this.editMode = false;
      });
    }
  };

  createActivityNew = async (
    activityFormValues: ActivityFormValuesNew,
    file: File | undefined
  ) => {
    const user = store.userStore.user;
    const attendee = new Profile(user!);
    try {
      //TODO:fix 204+205
      await agent.Activities.createNew(activityFormValues, file);
      const newActivity = new ActivityDetails(activityFormValues);
      newActivity.hostUsername = user!.username;
      // newActivity.attendees = [attendee];
      this.setActivity(newActivity);
      runInAction(() => {
        this.selectedActivity = newActivity;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.selectedActivity = undefined;
        this.editMode = false;
      });
    }
  };

  updateActivity = async (activity: ActivityFormValues) => {
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        if (activity.id) {
          let updatedActivity = {
            ...this.getActivity(activity.id),
            ...activity,
          };
          this.activityRegistry.set(activity.id, updatedActivity as Activity);
          this.selectedActivity = updatedActivity as ActivityDetails;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateActivityNew = async (
    activity: ActivityFormValuesNew,
    file: File | undefined
  ) => {
    try {
      await agent.Activities.updateNew(activity, file);
      runInAction(() => {
        if (activity.id) {
          let updatedActivity = {
            ...this.getActivity(activity.id),
            ...activity,
          };
          //TODO: update this so that when its added back to the registry , its got the correct object
          // this.activityRegistry.set(
          //   activity.id,
          //   updatedActivity as ActivityDetails
          // );
          // this.selectedActivity = updatedActivity as ActivityDetails;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateAttendance = async () => {
    const user = store.userStore.user;
    this.loading = true;
    try {
      //bang selected activity because this function will nly be called from the details page
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        if (this.selectedActivity?.isGoing) {
          this.selectedActivity.attendees =
            this.selectedActivity.attendees?.filter(
              (a) => a.username !== user?.username
            );
          this.selectedActivity.isGoing = false;
        }
        this.selectedActivity!.approvalStatus = ApprovalStatus.Pending;
        // else {
        //   const attendee = new Profile(user!);
        //   this.selectedActivity?.attendees?.push(attendee);
        //   this.selectedActivity!.isGoing = true;
        // }
        // this.activityRegistry.set(
        //   this.selectedActivity!.id,
        //   this.selectedActivity!
        // );
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  cancelActivityToggle = async () => {
    this.loading = true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        this.selectedActivity!.isCancelled =
          !this.selectedActivity?.isCancelled;
        this.activityRegistry.set(
          this.selectedActivity!.id,
          this.selectedActivity!
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  clearSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  uploadPhoto = async (file: Blob) => {
    this.uploadingPicture = true;
    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        // if (this.profile) {
        //   this.profile.photos?.push(photo);
        //   if (photo.isMain && store.userStore.user) {
        //     store.userStore.setImage(photo.url);
        //     this.profile.image = photo.url;
        //   }
        // }
        this.uploadingPicture = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.uploadingPicture = false));
    }
  };

  // updateAttendeeFollowing = (username: string) => {
  //   this.activityRegistry.forEach((activity) => {
  //     activity.attendees.forEach((attendee) => {
  //       if (attendee.username === username) {
  //         attendee.following
  //           ? attendee.followersCount--
  //           : attendee.followingCount++;
  //         attendee.following = !attendee.following;
  //       }
  //     });
  //   });
  // };
}
