import { observable, action, isAction } from "mobx";
import { createContext } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

class ActivityStore {
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable selectedActivity: IActivity | undefined = undefined;
  @observable editMode = false;

  //need an action that modifies the state of an observable
  //implemented using async await
  @action loadActivities = async () => {
    this.loadingInitial = true;
    try{
        const activities = await agent.Activities.list();
        activities.forEach((activity) => {
            //this code removes the 6 levels of accuracy in the datetime value
            activity.date = activity.date.split(".")[0];
            //use this below to reference clas sproperties
            this.activities.push(activity)
        });
        this.loadingInitial = false;
    }catch(error ){
        console.log(error);
        this.loadingInitial = false;
    }
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((a) => a.id === id);
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
