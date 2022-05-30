import React, { useEffect } from "react";
import { Grid, Header } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";
import ActivityDetailedChat from "./ActivityDetailedChat";

export default observer(function ActivityDetails() {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
    clearSelectedActivity,
  } = activityStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id)
      loadActivity(id).then((a) => {
        console.log("loaded activity details:");
        console.log(a);
      });

    return () => clearSelectedActivity();
  }, [id, loadActivity, clearSelectedActivity]);

  if (loadingInitial || !activity) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        {activity.attendees && (
          <>
            <Grid>
              <Grid.Row>
                <div
                  style={{
                    backgroundColor: "grey",
                    padding: "25px",
                    // marginTop: "20px",
                  }}>
                  <Header
                    content={
                      "The Chatroom, Guest list and Discussion features are only visible to approved attendees. You may use it to coordinate and/or share any preparation material etc "
                    }
                    size='small'
                    style={{
                      marginBottom: "0px",
                      color: "#eaeaea",
                    }}
                  />
                </div>
              </Grid.Row>
            </Grid>
            <ActivityDetailedSidebar activity={activity} />
            <ActivityDetailedChat activityId={activity.id} />
          </>
        )}
        {!activity.attendees && (
          <>
            <Header style={{ color: "grey", textAlign: "center" }}>
              🔒 Request an invite, to unlock the chatroom , view the guest list
              and engage in discussion
            </Header>
            <br />
          </>
        )}
      </Grid.Column>
    </Grid>
  );
});
