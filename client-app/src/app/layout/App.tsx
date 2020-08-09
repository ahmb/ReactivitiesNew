import React, { useState, useEffect, Fragment } from "react";
import { Header, List, Container } from "semantic-ui-react";
import axios from "axios";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);


  //useEffect is the equivalent of componentdidmount/update/delete
  //the second argument of the empty array tells it to only perform this effect once
  useEffect(()=>{
        axios.get<IActivity[]>('http://localhost:5000/api/activities')
    .then((response)=>{
      setActivities(response.data)
      });
    }, []);


  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: "7em"}}>
        <ActivityDashboard activities={activities}/>
      </Container>
    </Fragment>
  );
};

export default App;
