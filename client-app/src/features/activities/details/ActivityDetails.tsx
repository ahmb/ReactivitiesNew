import React, { useContext, useEffect } from "react";
import { Button, Grid, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import { history } from "../../../../src/index";

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
      <Grid.Row>
        <Grid.Column width={16}>
          <span style={{ display: "inline-Block" }}>
            {" "}
            <Button
              onClick={() => history.push("/activities")}
              floated="left"
              type="button"
              circular
              size="medium"
              style={{
                border: "none",
                // backgroundColor: "#009EE6",
                backgroundColor: "#DC493A",
                // position: "absolute",
                zIndex: 10,
                borderColor: "white",
              }}
              icon="long arrow alternate left"
              content="Back"
              inverted
            />
          </span>
        </Grid.Column>
      </Grid.Row>

      <Grid.Column width={16}>
        {/* <ActivityDetailedHeader activity={activity} /> */}
        <Segment.Group basic="true" raised>
          <Segment>
            <ActivityDetailedChat displayHeight="60vh" />

            <ActivityDetailsHeader activity={activity} />

            <ActivityDetailedInfo activity={activity} />
            <ActivityDetailedSidebar attendees={activity.attendees} />
          </Segment>
        </Segment.Group>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
