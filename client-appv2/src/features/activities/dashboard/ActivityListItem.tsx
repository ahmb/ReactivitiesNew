import format from "date-fns/format";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Item,
  Button,
  Segment,
  Icon,
  Label,
  Container,
  Image,
  Grid,
  Header,
} from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityListItemAttendee from "./ActivityListItemAttendee";
import { categoryOptions } from "../../../app/common/options/categoryOptions";

interface Props {
  activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {
  return (
    <Segment.Group
      className='activityDateGroup'
      raised
      style={{ borderRadius: "50px" }}>
      <Segment
        style={{
          borderTopLeftRadius: "50px",
          borderTopRightRadius: "50px",
          paddingBottom: "5px",
        }}>
        <Container
          style={{
            paddingLeft: "10px",
            paddingTop: "10px",
            float: "right",
            color: "blue",
          }}>
          {activity.isCancelled && (
            <Label
              attached='top'
              color='red'
              content='Cancelled'
              style={{ textAlign: "center" }}
            />
          )}

          {activity.isHost && <Label circular>Hosting</Label>}
          {activity.isGoing && !activity.isHost && (
            <Label circular>Attending </Label>
          )}
        </Container>
        <Item.Group style={{ borderRadius: "inherit" }}>
          <Item style={{ paddingBottom: "0px" }}>
            <Item.Content>
              <Item.Header
                as={Link}
                to={`/activities/${activity.id}`}
                style={{ paddingTop: "5px", paddingBottom: "20px" }}>
                {activity.title}
              </Item.Header>
              <Item.Description>
                {/* Hosted by{" "}
                <Link to={`/profiles/${activity.host?.username}`}>
                  {activity.host?.displayName}
                </Link> */}
                {/* <Item.Image
                  style={{ marginBottom: 5, height: 45, width: 45 }}
                  size='tiny'
                  floated='left'
                  circular
                  src={activity.host?.image || "/assets/user.png"}
                /> */}
                <Grid>
                  <Grid.Row centered stretched>
                    <Grid.Column width={4} style={{ textAlign: "center" }}>
                      <div style={{ paddingLeft: "15px" }}>
                        <Image
                          src={activity.host?.image || "/assets/user.png"}
                          circular
                          spaced='right'
                          style={{ height: 45, width: 45 }}
                          as={NavLink}
                          to={`/profiles/${activity.host?.username}`}
                        />
                      </div>
                      {/* {activity.host?.displayName} */}
                      <Header
                        size='small'
                        style={{ marginTop: "auto", paddingLeft: "5px" }}>
                        {activity.host?.displayName}
                      </Header>
                      <br />
                      {/* <span style={{ display: "flex" }}> */}
                      <Icon
                        name='users'
                        size='big'
                        color='grey'
                        style={{
                          paddingLeft: "20px",
                        }}></Icon>
                      <Header
                        style={{ marginTop: "auto", paddingLeft: "10px" }}>
                        {activity.attendees!.length}
                      </Header>
                      {/* </span> */}
                    </Grid.Column>
                    <Grid.Column
                      width={4}
                      style={{
                        textAlign: "left",
                        paddingTop: "10px",
                      }}
                      verticalAlign='middle'>
                      <Header
                        size='tiny'
                        style={{
                          marginTop: "auto",
                          padding: "0px",
                          marginBottom: "0px",
                        }}>
                        <i>from</i>
                      </Header>
                      <Header
                        color='red'
                        size='medium'
                        style={{
                          marginTop: "auto",
                          padding: "0px",
                          marginBottom: "0px",
                        }}>
                        {format(activity.date!, "h:mm aa")}
                        {/* dd MMM h:mm aa */}
                      </Header>
                      <Header
                        size='tiny'
                        style={{
                          padding: "0px",
                          margin: "0px",
                          fontSize: "11px",
                        }}>
                        <i>
                          {Intl.DateTimeFormat().resolvedOptions().timeZone}
                        </i>
                      </Header>

                      <br />
                      <Header
                        size='tiny'
                        style={{
                          marginTop: "auto",
                          paddingLeft: "0px",
                          marginBottom: "0px",
                        }}>
                        <i>to</i>
                      </Header>
                      <Header
                        color='red'
                        size='medium'
                        style={{
                          marginTop: "auto",
                          paddingLeft: "0px",
                          marginBottom: "0px",
                        }}>
                        {format(activity.endDate!, "h:mm aa")}
                        {/* dd MMM h:mm aa */}

                        {/* {activity.endDate
                          ?.toLocaleTimeString()
                          .slice(-2)
                          .toLowerCase()} */}
                      </Header>
                      <Header
                        size='tiny'
                        style={{
                          padding: "0px",
                          margin: "0px",
                          fontSize: "11px",
                        }}>
                        <i>
                          {" "}
                          {Intl.DateTimeFormat().resolvedOptions().timeZone}
                        </i>
                      </Header>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <Image
                        src={`/assets/categoryImages/${activity.category}.jpg`}
                        fluid
                        style={{
                          borderRadius: "20px",
                          boxShadow: "0px 10px 2px 0px aliceblue",
                        }}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row
                    style={{ paddingBottom: "0px", paddingTop: "25px" }}>
                    <Container>
                      <Header size='small'>
                        {
                          categoryOptions.filter(
                            (c) => c.value === activity.category
                          )[0]?.icon
                        }
                        {
                          categoryOptions.filter(
                            (c) => c.value === activity.category
                          )[0]?.value
                        }
                      </Header>
                    </Container>
                  </Grid.Row>
                </Grid>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      {/* <Segment secondary>
        <ActivityListItemAttendee attendees={activity.attendees!} />
      </Segment> */}

      <Segment
        style={{
          borderBottomRightRadius: "50px",
          borderBottomLeftRadius: "50px",
          padding: "10px",
          borderTop: "none",
          paddingTop: "0px",
        }}
        clearing>
        #tag1 #tag2 #tag3
        {/* <span>{activity.description}</span> */}
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          color='red'
          floated='right'
          content='View'
          circular
          style={{ margin: "10px", boxShadow: "#a51c1d 1px 3px 0px 0px" }}
        />
      </Segment>
    </Segment.Group>
  );
}
