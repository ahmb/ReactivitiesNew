import Avatar from "boring-avatars";
import { observer } from "mobx-react-lite";

import { Link, NavLink } from "react-router-dom";
import {
  Segment,
  List,
  Item,
  Label,
  Image,
  Header,
  Button,
  Grid,
} from "semantic-ui-react";
import { ActivityDetails } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

interface Props {
  activity: ActivityDetails;
}

export default observer(function ActivityDetailedSidebar({
  activity: { attendees, host, isGoing, isHost },
}: Props) {
  const {
    activityStore: { updateAttendance, loading },
  } = useStore();

  if (!attendees) return null;
  return (
    <>
      <Segment
        textAlign='center'
        style={{ backgroundColor: "aliceblue", color: "grey" }}
        basic
        attached='top'
        secondary>
        <Header size='tiny' style={{ color: "grey" }}>
          Guest List
        </Header>

        {/* {attendees.length}{" "}
        {attendees.length === 1 ? "Person" : "People"} going */}
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.map(
            (attendee) =>
              attendee.username !== host?.username && (
                <span style={{ display: "grid" }} key={attendee.username}>
                  <Item
                    // style={{ position: "relative" }}
                    key={attendee.username}>
                    {attendee.username === host?.username && (
                      <Label
                        style={{ position: "absolute" }}
                        color='orange'
                        ribbon='right'>
                        Host
                      </Label>
                    )}
                    {attendee.image && (
                      <Image
                        floated='left'
                        circular
                        style={{ height: "65px", width: "65px" }}
                        // size='tiny'
                        src={attendee.image || "/assets/user.png"}
                        as={NavLink}
                        to={`/profiles/${attendee.username}`}
                      />
                    )}
                    {!attendee.image && (
                      <span style={{ float: "left", marginBottom: "3%" }}>
                        <NavLink to={`/profiles/${attendee.username}`}>
                          <Avatar
                            size={65}
                            name={attendee.username}
                            variant='beam'
                            colors={[
                              "#D8C395",
                              "#F77825",
                              "#F5F03A",
                              "#F1EFA5",
                              "#60BB99A",
                            ]}
                          />
                        </NavLink>
                      </span>
                    )}
                    <Item.Content verticalAlign='middle'>
                      <Item.Header
                        as='h3'
                        // style={{ padding: "20px", marginLeft: "15%" }}
                      >
                        <Link to={`/profiles/${attendee.username}`}>
                          {attendee.displayName}
                        </Link>
                      </Item.Header>
                      {attendee.following && (
                        <Item.Extra style={{ color: "orange" }}>
                          Following
                        </Item.Extra>
                      )}
                    </Item.Content>
                  </Item>
                </span>
              )
          )}
        </List>
      </Segment>
      {isGoing && !isHost && (
        <Grid style={{ marginTop: "5px", paddingBottom: "5px" }}>
          <Grid.Row>
            <Grid.Column textAlign='right'>
              <Button
                color='red'
                onClick={updateAttendance}
                loading={loading}
                circular
                style={{
                  boxShadow: "#c50000 1px 3px 0px 0px",
                  // marginTop: "10px",
                  // marginBottom: "10px",
                }}>
                Cancel attendance
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </>
  );
});
