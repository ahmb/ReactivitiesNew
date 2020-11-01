import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import {
  Item,
  Button,
  Segment,
  Icon,
  Label,
  Image,
  Divider,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IActivity } from "../../../app/models/activity";
import { format } from "date-fns";
import ActivityListItemAttendees from "./ActivityListItemAttendees";
import { category } from "../../../app/common/options/categoryOptions";
import { stringCapitalize } from "../../../app/common/util/util";

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
                />{" "}
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
                      style={{ marginLeft: 10 }}
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
                      style={{ marginLeft: 10 }}
                    />
                  </Fragment>
                )}
              </Item.Header>

              <br />
              <Item.Extra>
                <p style={{marginTop:0}}>
                  {"with "}
                  <Link to={`/profile/${host.username}`}>
                    {host.displayName}
                  </Link>
                </p>
                <Icon
                  name="clock outline"
                  style={{ width: "1.5em", height: "1.5em" }}
                />{" "}
                {format(activity.date, "h:mm a")}{" "}
                {/* display icon related to the category or show the default icon */}
                {category.filter(
                  (e) => e.key.toLowerCase() === activity.category.replace("&", "").replace(/\s/g, "").toLowerCase()
                ).length > 0 && (
                  <Image
                    avatar
                    circular
                    className="categoryIconSmall"
                    src={`/assets/categoryImages/${activity.category.replace("&", "").replace(/\s/g, "").toLowerCase()}.png`}
                    style={{ width: "1.5em", height: "1.5em" }}
                  />
                )}
                {category.filter(
                  (e) => e.key.toLowerCase() === activity.category.replace("&", "").replace(/\s/g, "").toLowerCase()
                ).length === 0 && (
                  <Image
                    avatar
                    circular
                    className="categoryIconSmall"
                    src={"/assets/categoryImages/misc.png"}
                    style={{ marginBotton: -13, marginTop: -3 }}
                  />
                )}
                {stringCapitalize(activity.category)}{" "}
                <Icon
                  name="hashtag"
                  style={{ width: "1.5em", height: "1.5em" }}
                />{" "}
                {activity.tags}{" "}
              </Item.Extra>
              {/* <Button
                  as={Link}
                  to={`/activities/${activity.id}`}
                  // onClick={() => selectActivity(activity.id)}
                  floated="right"
                  content="Details"
                  // color="twitter"
                  inverted
                  style={{ backgroundColor: "#009EE6", marginTop:10 }}
                  size="tiny"
                  circular
                /> */}

              {/* <Item.Description></Item.Description>
                Hosted by
                <Link to={`/profile/${host.username}`}> {host.displayName}
                </Link>
              </Item.Description> */}

              <Item.Description>
                {" "}
                <span>
                  {activity.description.length > 280 &&
                    activity.description.substring(0, 280) + "..."}
                  {activity.description.length < 280 && activity.description}
                  <p>
                    <Link to={`/activities/${activity.id}`}> Details </Link>
                  </p>
                </span>
              {category.filter(
                (e) => e.key.toLowerCase() === activity.category.replace("&", "").replace(/\s/g, "").toLowerCase()
              ).length > 0 && (
                  <div
                    style={{
                      overflow: "hidden",
                      height: "15vh",
                      borderRadius: 10,
                    }}
                  >
                    <Image
                      src={`/assets/categoryImages/${activity.category
                        .replace("&", "")
                        .replace(/\s/g, "")
                        .toLowerCase()}.jpg`}
                      // height="100px"
                      // width="100%"
                      fluid
                      centered
                      // style={activityImageStyle}
                      style={{ borderRadius: 10 }}
                    />
                  </div>

              )}
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
      {/* <Segment  clearing style={{overflow:'hidden', height:'15vh'}} > */}
      {/* </Segment> */}
    </Segment.Group>
  );
};

export default observer(ActivityListItem);
