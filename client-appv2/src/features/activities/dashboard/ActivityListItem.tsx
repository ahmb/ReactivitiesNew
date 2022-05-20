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
  GridColumn,
} from "semantic-ui-react";
import { Activity, Language, SkillLevel } from "../../../app/models/activity";
import ActivityListItemAttendee from "./ActivityListItemAttendee";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import Avatar from "boring-avatars";

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
        <Item.Group style={{ borderRadius: "inherit", paddingTop: "0px" }}>
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
                <Container>
                  <Grid>
                    <Grid.Row centered stretched>
                      <Grid.Column width={4} style={{ textAlign: "center" }}>
                        <div style={{ alignSelf: "center" }}>
                          {activity.host?.image && (
                            <Image
                              src={activity.host?.image || "/assets/user.png"}
                              circular
                              spaced='right'
                              style={{ height: 45, width: 45 }}
                              as={NavLink}
                              to={`/profiles/${activity.host?.username}`}
                            />
                          )}
                          {!activity.host?.image && (
                            <NavLink
                              to={`/profiles/${activity.host?.username}`}>
                              <Avatar
                                size={45}
                                name={activity.host?.username}
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
                          )}
                        </div>
                        {/* {activity.host?.displayName} */}
                        <Header
                          size='small'
                          style={{ marginTop: "auto", alignSelf: "center" }}>
                          {activity.host?.displayName}
                        </Header>
                        {/* <br /> */}
                        {/* <span style={{ display: "flex" }}> */}
                        <Icon
                          name='users'
                          size='big'
                          color='grey'
                          style={{
                            alignSelf: "center",
                          }}></Icon>
                        <Header
                          size='tiny'
                          style={{ marginTop: "auto", alignSelf: "center" }}>
                          {activity.attendeeCount}
                          {" attending"}
                        </Header>

                        {/* </span> */}
                      </Grid.Column>
                      <Grid.Column
                        width={4}
                        style={{
                          textAlign: "left",
                          marginTop: "-10px",
                        }}
                        verticalAlign='middle'>
                        {/* <Header
                          size='tiny'
                          color='grey'
                          style={{
                            marginTop: "auto",
                            padding: "0px",
                            marginBottom: "0px",
                          }}> */}
                        <i> {format(activity.date!, "M/dd")}</i>
                        {/* </Header> */}
                        <Header
                          color='red'
                          size='tiny'
                          style={{
                            marginTop: "auto",
                            padding: "0px",
                            marginBottom: "0px",
                          }}>
                          {format(activity.date!, "h:mm aa")}
                          {/* dd MMM h:mm aa */}
                        </Header>
                        {/* <Header
                          size='tiny'
                          color='grey'
                          style={{
                            padding: "0px",
                            margin: "0px",
                            fontSize: "11px",
                          }}> */}
                        <p style={{ color: "grey", fontSize: "12px" }}>
                          <i>
                            {Intl.DateTimeFormat().resolvedOptions().timeZone}
                          </i>
                        </p>
                        {/* </Header> */}
                        <Header
                          color='red'
                          size='tiny'
                          style={{
                            marginTop: "auto",
                            paddingLeft: "0px",
                            marginBottom: "0px",
                          }}>
                          {activity.duration}
                          {/* {format(activity.endDate!, "h:mm aa")} */}
                          {/* dd MMM h:mm aa */}

                          {/* {activity.endDate
                          ?.toLocaleTimeString()
                          .slice(-2)
                          .toLowerCase()} */}
                        </Header>{" "}
                        {/* <Header
                          size='tiny'
                          style={{
                            marginTop: "auto",
                            paddingLeft: "0px",
                            // marginBottom: "0px",
                          }}
                          color='grey'> */}
                        <p style={{ color: "grey" }}>
                          <i>minutes</i>
                        </p>
                        {/* </Header> */}
                        <p style={{ color: "grey" }}>
                          {"Maximum " +
                            activity.attendeeCountMax +
                            " attendee(s)"}
                        </p>
                      </Grid.Column>
                      <Grid.Column width={8}>
                        <Image
                          src={`/assets/categoryImages/${activity.categories[0].name}.jpg`}
                          style={{
                            borderRadius: "20px",
                            boxShadow: "0px 10px 2px 0px aliceblue",
                            maxWidth: "150px",
                            maxHeight: "150px",
                            alignSelf: "center",
                          }}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row
                      stretched
                      centered
                      style={{ marginBottom: "0px" }}>
                      <Grid.Column width={8}>
                        <p>{"Language:   " + Language[activity.language]}</p>
                        {/* <p>{"Language:   " + Language[activity.language]}</p> */}
                      </Grid.Column>
                      <Grid.Column width={8}>
                        <p>
                          {"Skill Level:   " + SkillLevel[activity.skillLevel]}
                        </p>
                      </Grid.Column>
                      {/* <span className='listLanguage'> */}

                      {/* </span> */}
                    </Grid.Row>
                    <Grid.Row
                      style={{
                        paddingTop: "0px",
                        paddingBottom: "0px",
                        paddingLeft: "15px",
                      }}>
                      {activity.categories.map((c) => (
                        <p id='listCategories'>
                          {categoryOptions.filter(
                            (co) => co.value === c.name
                          )[0].icon +
                            " " +
                            categoryOptions.filter(
                              (co) => co.value === c.name
                            )[0].text +
                            "  "}
                        </p>
                      ))}
                    </Grid.Row>
                    <Grid.Row
                      style={{
                        paddingTop: "0px",
                        paddingBottom: "0px",
                        paddingLeft: "15px",
                        marginBottom: "10px",
                      }}>
                      <p id='listTags'>
                        {activity.tag.map((t) => "#" + t.name.toString() + " ")}
                      </p>
                    </Grid.Row>
                    {/* <Grid.Row
                      style={{
                        paddingTop: "0px",
                        paddingBottom: "0px",
                      }}>
                      <Grid.Column floated='right'>
                        <Button
                          as={Link}
                          to={`/activities/${activity.id}`}
                          floated='right'
                          content='View'
                          circular
                          style={{
                            margin: "10px",
                            boxShadow: "#404cb8 1px 3px 0px 0px",
                            backgroundColor: "#5162FA",
                            color: "white",
                          }}
                        />
                      </Grid.Column>
                    </Grid.Row> */}
                  </Grid>
                </Container>
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
        {/* <span>{activity.description}</span> */}
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated='right'
          content='View'
          circular
          style={{
            margin: "10px",
            boxShadow: "#404cb8 1px 3px 0px 0px",
            backgroundColor: "#5162FA",
            color: "white",
          }}
        />
      </Segment>
    </Segment.Group>
  );
}
