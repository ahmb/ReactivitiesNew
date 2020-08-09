import React from "react";
import { Grid, GridColumn, List } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { ActivityList } from "./ActivityList";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivity: IActivity | null ;
}

//demonstrates :
//1. Inherit from React FC (Functional Component) which can take props
//2. destructring the activities out of props
//3. loop over the array of Activities
const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity
}) => {
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </GridColumn>
      <GridColumn width={6}>
          {selectedActivity && <ActivityDetails activity={selectedActivity}/>}
        <ActivityForm />
      </GridColumn>
    </Grid>
  );
};

export default ActivityDashboard;
