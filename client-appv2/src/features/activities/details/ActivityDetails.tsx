import { useEffect } from "react";
import { Grid, Header, Icon, Segment } from "semantic-ui-react";
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

  if (loadingInitial || !activity)
    return <LoadingComponent content='Loading details...' />;

  return (
    <Grid style={{ marginTop: "2em" }}>
      <Grid.Column width={16}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        {activity.attendees && activity.assets && (
          <Segment>
            <Grid>
              <Grid.Row
                style={{
                  paddingLeft: "5%",
                  paddingRight: "5%",
                  paddingTop: "2%",
                  paddingBottom: "2%",
                }}>
                <Icon name='linkify' color='grey' />
                {activity.assets}
              </Grid.Row>
            </Grid>
          </Segment>
        )}
        {activity.attendees && (
          <>
            <Grid>
              <Grid.Row centered>
                <div
                  style={{
                    backgroundColor: "grey",
                    padding: "25px",
                    // marginTop: "20px",
                  }}>
                  <Header
                    content={
                      "The Chatroom, Guest list and Discussion features are only visible to approved attendees. Please DO NOT click on any unknown links or share sensitive information "
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
