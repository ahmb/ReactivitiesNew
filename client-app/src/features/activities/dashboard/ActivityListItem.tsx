import React from "react";
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
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src={host.image || "/assets/user.png"}
              style={{ marginBottom: 3 }}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>
                Hosted by
                <Link to={`/profile/${host.username}`}> {host.displayName}
                </Link>
              </Item.Description>
              {activity.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color="green"
                    content="HOSTING"
                  />
                </Item.Description>
              )}
              {activity.isGoing && !activity.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color="orange"
                    content="ATTENDING"
                  />
                </Item.Description>
              )}

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
      <Segment>
        <Icon name="clock" /> {format(activity.date, "h:mm a")}
        <Icon name="marker" /> {activity.venue}, {activity.city}
      </Segment>
      <ActivityListItemAttendees attendees={activity.attendees} />
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          // onClick={() => selectActivity(activity.id)}
          floated="right"
          content="View"
          color="blue"
        />
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityListItem);
