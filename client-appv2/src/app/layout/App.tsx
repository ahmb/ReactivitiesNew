import React, { Fragment, useEffect, useState } from 'react';
import { IActivitiesEnvelope, IActivity } from '../models/activity';
import NavBar from './NavBar';
import axios from 'axios';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {Container} from 'semantic-ui-react';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

export default function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
      let  activities: IActivity[] = [];
      response.activities.forEach(activity => {
        activity.date = activity.date.toString().split('T')[0];
        activities.push(activity);
      });
      setActivities(activities);
      setLoading(false);
    })
  },[])

   function handleSelectedActivity(id: string){
     setSelectedActivity(activities.find(x=>x.id===id));
   }

   function handleCancelActivity(){
     setSelectedActivity(undefined);
   }

   function handleFormOpen(id?:string) {
     id ? handleSelectedActivity(id) : handleCancelActivity();
     setEditMode(true);
   }

   function handleFormClose(){
     setEditMode(false);
   }

   function handleCreateOrEditActivity(activity:IActivity){
     setSubmitting(true);
     if(activity.id){
       agent.Activities.update(activity).then(()=>{
          setActivities([...activities.filter(x => x.id !== activity.id), activity]);
          setSelectedActivity(activity)
          setEditMode(false);
          setSubmitting(false);
       })
     } else {
       activity.id = uuid();
       agent.Activities.create(activity).then(()=> {
         setActivities([...activities,activity]);
         setSelectedActivity(activity)
         setEditMode(false);
         setSubmitting(false);
       })
     }

   }

   
   function handleDeleteActivity(id: string){
      setSubmitting(true);
      agent.Activities.delete(id).then(()=>{
        setActivities([...activities.filter(x => x.id !== id)]);
        setSubmitting(false);
        if(selectedActivity && id == selectedActivity.id) handleCancelActivity();
      })
  }

  if(loading) return <LoadingComponent content='Loading app'/>

  return (
      <Fragment>
       <NavBar openForm={handleFormOpen}/>
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard 
            activities={activities} 
            selectedActivity={selectedActivity}
            selectActivity={handleSelectedActivity}
            cancelSelectActivity={handleCancelActivity}
            editMode={editMode}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            createOrEdit={handleCreateOrEditActivity}
            deleteActivity={handleDeleteActivity}
            submitting={submitting}
          />
        </Container>
      </Fragment>
  );
}