import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { IActivity } from "../models/activity";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  activities: IActivity[] = [];
  activityRegistry = new Map<string, IActivity>();
  selectedActivity: IActivity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    // makeObservable(this, {
    //     title: observable,
    //     setTitle:action
    // })
    //starts observing all the object properties
    makeAutoObservable(this);
  }

  //this is a computed property
  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date.toString()) - Date.parse(b.date.toString())
    );
  }

  loadActivities = async () => {
    try {
      const activitiesEnvelope = await agent.Activities.list();
      runInAction(() => {
        activitiesEnvelope.activities.forEach((activity) => {
          activity.date = activity.date.toString().split("T")[0];
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
  };

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createActivity = async (activity: IActivity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.loading = false;
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.selectedActivity = undefined;
        this.loading = false;
        this.editMode = false;
      });
    }
  };

  updateActivity = async (activity: IActivity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        // this.selectedActivity = undefined;
        // this.editMode = false;
        this.loading = false;
      });
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        if (this.selectedActivity?.id === id) {
          this.cancelSelectedActivity();
        }
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
