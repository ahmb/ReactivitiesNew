import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";
import 'mobx-react-lite/batchingForReactDom'

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable loadingInitial = false;
  @observable activity: IActivity | null = null;
  @observable submitting = false;
  @observable target = "";

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  //need an action that modifies the state of an observable
  //implemented using async await
  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction('loading activities', () => {
        activities.forEach((activity) => {
          //this code removes the 6 levels of accuracy in the datetime value
          activity.date = activity.date.split(".")[0];
          //use this below to reference clas sproperties
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
      runInAction('load activities error', () => {
        this.loadingInitial = false;
      });
    }
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if(activity){
      this.activity = activity;
    }else{
      this.loadingInitial = true;
      try{
        activity = await agent.Activities.details(id);
        runInAction('getting activity',()=> {
          this.activity = activity;
          this.loadingInitial = false;
        })
      }catch(error){
        runInAction('get activitiy error', ()=> {
          this.loadingInitial = false;
        })
        console.log(error);
      }
    }
  }

  @action clearActivity = () => {
    this.activity = null;
  }

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  }

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction('creating activity', () => {
        this.activityRegistry.set(activity.id, activity);
        //activity.push is similar to adding it to the registry set , observable map above ^
        //this.activities.push(activity);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create activity error', ()=> {
        this.submitting = false;
        console.log(error);
      })
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction('editing an activity', ()=>{
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
      } )
    } catch (error) {
      runInAction('edit activity error', ()=> {
        this.submitting = false;
        console.log(error);
      })
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
      runInAction('deleting activity', ()=> {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      })
    } catch (error) {
      runInAction('delete activity error', ()=> {
        console.log(error);
        this.submitting = false;
        this.target = "";
      })

    }
  };
  };


export default createContext(new ActivityStore());
