import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import UnreadActivitiesList from "./UnreadActivitiesList";
import UserActivities from "./UserActivities";

const Homepage = () => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <UnreadActivitiesList />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <UserActivities />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default observer(Homepage);
