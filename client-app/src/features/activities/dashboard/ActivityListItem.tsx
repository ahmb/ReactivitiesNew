import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Item, Button, Segment, Icon, Label, Image, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IActivity } from "../../../app/models/activity";
import { format } from "date-fns";
import ActivityListItemAttendees from "./ActivityListItemAttendees";
import { category } from "../../../app/common/options/categoryOptions";

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
  const host = activity.attendees.filter((x) => x.isHost)[0];

  return (
    <Segment.Group style={{ borderRadius: 5 }}>
      <Segment padded>
        <Item.Group>
          <Item>
            <Item.Content>
              <Link to={`/profile/${host.username}`}>
                <Item.Image
                  size="mini"
                  circular
                  src={host.image || "/assets/user.png"}
                  style={{ marginBottom: 3 }}
                  floated="left"
                />
              </Link>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}{" "}
                {activity.isHost && (
                  <Fragment>
                    <Label
                      basic
                      color="green"
                      content="HOSTING"
                      circular
                      size="mini"
                      style={{marginLeft:10}}
                    />
                  </Fragment>
                )}
                {activity.isGoing && !activity.isHost && (
                  <Fragment>
                    <Label
                      basic
                      color="orange"
                      content="ATTENDING"
                      circular
                      size="mini"
                      style={{marginLeft:10}}
                    />
                  </Fragment>
                )}
              </Item.Header>

              <br />
              <Item.Extra>
                    
                <Icon name="clock" style={{width:'1.5em', height:'1.5em'}} /> {format(activity.date, "h:mm a")}{" "}
                {category.filter((e) => e.key === activity.category).length >
                  0 && (
                  <Image
                    avatar
                    circular
                    className='categoryIconSmall'
                    src={`/assets/categoryImages/${activity.category}.png`}
                    style={{width:'1.5em', height:'1.5em'}}
                  />
                )}
                {category.filter((e) => e.key === activity.category).length ===
                  0 && (
                  <Image
                    avatar
                    circular
                    className='categoryIconSmall'
                    src={"/assets/categoryImages/misc.png"}
                  />
                )}
                {activity.category} <Icon name="tags" style={{width:'1.5em', height:'1.5em'}}/> TAG 1 TAG 2{" "}
              </Item.Extra>

              {/* <Item.Description>
                Hosted by
                <Link to={`/profile/${host.username}`}> {host.displayName}
                </Link>
              </Item.Description> */}

              <Item.Description>
                {" "}
                <span>
                  {activity.description.substring(0, 280)}
                  Im planning on working out at the Goodlife gym , focusing on
                  my biceps. Lemme know if you wanna workout together!
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
                  style={{ backgroundColor: "#DC493A" }}
                  size="tiny"
                  circular
                />
                {/* <Link to={`/activities/${activity.id}`}> Activity Details & Chat  </Link> */}
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

        <div style={{ overflow: "hidden", height: "15vh", borderRadius: 10 }}>
          <Image
            src={`/assets/categoryImages/${activity.category}.jpg`}
            // height="100px"
            // width="100%"
            fluid
            centered
            // style={activityImageStyle}
            style={{ borderRadius: 10 }}
          />
        </div>
      </Segment>

      {/* <ActivityListItemAttendees attendees={activity.attendees} /> */}
      {/* <Segment  clearing style={{overflow:'hidden', height:'15vh'}} > */}
      {/* </Segment> */}
    </Segment.Group>
  );
};

export default observer(ActivityListItem);
