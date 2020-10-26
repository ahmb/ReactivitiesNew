import React, { Fragment, useContext } from "react";
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
  height: "100%",
};

const ActivityDetailedHeader: React.FC<{ activity: IActivity }> = ({
  activity,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { attendActivity, cancelAttendance, loading } = rootStore.activityStore;
  const host = activity.attendees.filter((x) => x.isHost)[0];

  return (
    <Fragment>
      {/* <Segment basic style={{ padding: "0" }} attached="top" > */}
      <div
        style={{
          maxHeight: "40em",
          overflow: "hidden",
          borderRadius: 10,
          margin: 0,
        }}
      >
        <Image
          src={`/assets/categoryImages/${activity.category
            .replace("&", "")
            .replace(/\s/g, "")
            .toLowerCase()}.jpg`}
          fluid
          style={{ borderRadius: 10 }}
          // style={activityImageStyle}
        />
        {/* </Segment> */}
      </div>
      {/* <Segment clearing attached="bottom" > */}
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
                style={{ backgroundColor: "#009EE6" }}
                floated="right"
                inverted
                circular
                // style={{backgroundColor: "#DC493A"}}
              >
                Edit Activity
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
      {/* </Segment> */}
    </Fragment>
  );
};

export default observer(ActivityDetailedHeader);
