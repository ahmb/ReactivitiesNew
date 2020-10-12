import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Item, Button, Segment, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IActivity } from "../../../app/models/activity";
import { format } from "date-fns";
import ActivityListItemAttendees from "./ActivityListItemAttendees";

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
  const host = activity.attendees.filter((x) => x.isHost)[0];

  return (
    <Segment.Group>
      <Segment padded>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.isHost && (
                  <Fragment>
                    <Label basic color="green" content="HOSTING" circular />
                    <br />
                    <br />
                  </Fragment>
                )}
                {activity.isGoing && !activity.isHost && (
                  <Fragment>
                    <Label basic color="orange" content="ATTENDING" circular />
                    <br />
                    <br />
                  </Fragment>
                )}{" "}
                {activity.title}
              </Item.Header>
              <br />
              <Item.Extra>
                <Icon name="clock" /> {format(activity.date, "h:mm a")}{" "}
                <Icon name="chart pie" /> {activity.category}{" "}
                <Icon name="tags" /> TAG 1 TAG 2{" "}
              </Item.Extra>
              <br />
              <Link to={`/profile/${host.username}`}>
                <Item.Image
                  size="tiny"
                  circular
                  src={host.image || "/assets/user.png"}
                  style={{ marginBottom: 3 }}
                  floated="left"
                />
              </Link>

              {/* <Item.Description>
                Hosted by
                <Link to={`/profile/${host.username}`}> {host.displayName}
                </Link>
              </Item.Description> */}

              <Item.Description>
                {" "}
                <span>{activity.description.substring(0, 280)} 
                Im planning on working out at the Goodlife gym , focusing on my biceps. Lemme know if you wanna workout together!
                </span>
                
       
              </Item.Description>
              <Item.Description>
                <Button
                  as={Link}
                  to={`/activities/${activity.id}`}
                  // onClick={() => selectActivity(activity.id)}
                  floated="left"
                  content="Details"
                  // color="twitter"
                  inverted
                  style={{backgroundColor:'#3f3d56'}}
                  size="tiny"
                  circular
                />
              </Item.Description>

              {/* <Button
                name={activity.id}
                loading={target === activity.id && submitting}
                onClick={(e) => deleteActivity(e, activity.id)}
                floated="right"
                content="Delete"
                color="red"
              /> */}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      {/* <ActivityListItemAttendees attendees={activity.attendees} /> */}
      <Segment clearing padded>
        INSERT IMAGE HERE
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityListItem);
