import React, { useContext } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import  ActivityList  from "./ActivityList";
import ActivityDetails  from "../details/ActivityDetails";
import  ActivityForm  from "../form/ActivityForm";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";

//demonstrates :
//1. Inherit from React FC (Functional Component) which can take props
//2. destructring the activities out of props
//3. loop over the array of Activities
const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { editMode, activity } = activityStore;
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList />
      </GridColumn>
      <GridColumn width={6}>
        <h2>Activity Filters</h2>
        {/* {activity && !editMode && (<ActivityDetails />)}
        {editMode && (
          <ActivityForm
            key={(activity && activity.id) || 0}
            activity={activity!}
          />
        )} */}
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityDashboard);
