import React, { useContext } from "react";
import { Segment, Item, Image, Header, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { RootStoreContext } from "../../../app/stores/rootStore";

// const activityImageStyle = {
//   filter: "brightness(30%)",
// };

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
};

const ActivityDetailedHeader: React.FC<{ activity: IActivity }> = ({
  activity,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { attendActivity, cancelAttendance, loading } = rootStore.activityStore;
  const host = activity.attendees.filter((x) => x.isHost)[0];

  return (
    <Segment.Group>
      <Segment basic style={{ padding: "0" }} attached="top" raised>
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          // style={activityImageStyle}
        />
      </Segment>

      <Segment clearing attached="bottom" raised>
        <Item.Group>
          <Item>
            <Item.Content>
              <Header size="huge" content={activity.title} />
              {/* Hosted by <Link to={`/profile/${host.username}`}>
                  <strong>{host.displayName}</strong></Link> */}

              {activity.isHost ? (
                <Button
                  as={Link}
                  to={`/manage/${activity.id}`}
                  // color="twitter"
                  style={{ backgroundColor: "#3f3d56" }}
                  floated="right"
                  inverted
                  circular
                  // style={{backgroundColor: "#DC493A"}}
                >
                  Edit Event
                </Button>
              ) : activity.isGoing ? (
                <Button
                  loading={loading}
                  onClick={cancelAttendance}
                  floated="right"
                  circular
                >
                  Cancel attendance
                </Button>
              ) : (
                <Button
                  loading={loading}
                  onClick={attendActivity}
                  color="green"
                  floated="right"
                  circular
                >
                  Join Activity
                </Button>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityDetailedHeader);
