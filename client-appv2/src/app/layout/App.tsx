import React, { Fragment, useEffect, useState } from 'react';
import { IActivitiesEnvelope, IActivity } from '../models/activity';
import NavBar from './NavBar';
import axios from 'axios';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {Container} from 'semantic-ui-react';
import {v4 as uuid} from 'uuid';

export default function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<IActivitiesEnvelope>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data.activities)});
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
     //remove the activity we are updting and insert a new activity for the updated activity
     //using an array literal to create the new array , by filtering the old and appencding new element
      activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) : 
                   setActivities([...activities, {...activity, id: uuid()}]);

      setEditMode(false);
      setSelectedActivity(activity);
   }

   function handleDeleteActivity(id: string){
      setActivities([...activities.filter(x => x.id !== id)]);
  }


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
          />
        </Container>
      </Fragment>
  );
}