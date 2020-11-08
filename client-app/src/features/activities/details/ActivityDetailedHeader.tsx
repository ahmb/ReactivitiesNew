import React, { useContext } from "react";
import { Segment, Item, Image, Header, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { covertDateUTCtoLocal } from "../../../app/common/util/util";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "auto",
  height: "auto",
  color: "white",
  borderColor:"aliceblue"
};

const ActivityDetailedHeader: React.FC<{ activity: IActivity }> = ({
  activity,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { attendActivity, cancelAttendance, loading } = rootStore.activityStore;
  const host = activity.attendees.filter((x) => x.isHost)[0];

  return (
    <Segment.Group >
      <Segment basic attached="top" style={{ padding: "0" , borderColor:"aliceblue"}} raised>
        <Image
          src={`/assets/categoryImages/${activity.category.replace(' ','').replace('&','').toLowerCase()}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment basic style={activityImageTextStyle} raised>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />
                <p>{format(activity.date, "eeee do MM")}</p>
                <p>
                  Hosted by <Link to={`/profile/${host.username}`}>
                  <strong>{host.displayName}</strong></Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom" style={{borderColor:"aliceblue"}}>
        {activity.isHost ? (
          <Button
            as={Link}
            to={`/manage/${activity.id}`}
            color="red"
            floated="left"
            inverted
            circular
            // style={{backgroundColor: "#DC493A"}}
          >
            Edit Event
          </Button>
        ) : activity.isGoing ? (
          <Button loading={loading} onClick={cancelAttendance}>
            Cancel attendance
          </Button>
        ) : (
          <Button loading={loading} onClick={attendActivity} color="green">
            Join Activity
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityDetailedHeader);
