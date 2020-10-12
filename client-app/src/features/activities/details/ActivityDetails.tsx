import React, { useContext, useEffect } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ActivityDetailsHeader from "./ActivityDetailsHeader";

interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { activity, loadActivity, loadingInitial } = rootStore.activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loadingInitial || !activity)
    return <LoadingComponent content="Loading activity.." />;

  if (!activity) {
    return <h2>Activity not found</h2>;
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <div style={{ marginTop: "70px" }} />

        <ActivityDetailedSidebar attendees={activity.attendees} />
      </Grid.Column>
      <Grid.Column width={10}>
        <div style={{ marginTop: "70px" }} />

        {/* <ActivityDetailedHeader activity={activity} /> */}
        <Segment.Group basic raised>
          <Segment>
            <ActivityDetailsHeader activity={activity} />

            <ActivityDetailedInfo activity={activity} />

            <ActivityDetailedChat />
          </Segment>
        </Segment.Group>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
