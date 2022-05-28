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
            <Label
              circular
              horizontal
              attached='top right'
              style={{
                marginTop: "20px",
                marginRight: "20px",
                backgroundColor: "#37cf37",
                color: "white",
              }}>
              attending
            </Label>
          )}
        </Container>
        <Item.Group style={{ borderRadius: "inherit", paddingTop: "0px" }}>
          <Item style={{ paddingBottom: "0px", marginBottom: "0px" }}>
            <Item.Content>
              <Item.Header
                as={Link}
                to={`/activities/${activity.id}`}
                style={{
                  paddingTop: "3%",
                  paddingBottom: "20px",
                  paddingLeft: "2%",
                  paddingRight: "2%",
                }}>
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
                    <Grid.Row centered verticalAlign='middle'>
                      <Grid.Column
                        verticalAlign='middle'
                        width={4}
                        style={{ textAlign: "center", alignItems: "center" }}>
                        <div style={{ alignSelf: "center" }}>
                          {activity.host?.image && (
                            <Image
                              src={activity.host?.image || "/assets/user.png"}
                              circular
                              spaced='right'
                              style={{ height: 65, width: 65 }}
                              as={NavLink}
                              to={`/profiles/${activity.host?.username}`}
                            />
                          )}
                          {!activity.host?.image && (
                            <NavLink
                              to={`/profiles/${activity.host?.username}`}>
                              <Avatar
                                size={65}
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
                          style={{
                            marginTop: "auto",
                            alignSelf: "center",
                            alignItems: "center",
                          }}>
                          {activity.host?.displayName}
                        </Header>
                        {/* <br /> */}
                        <Icon
                          name='users'
                          size='big'
                          color='grey'
                          style={{
                            paddigBottom: "0px",
                            marginBottom: "0px",
                            marginTop: "20%",

                            // alignSelf: "center",
                          }}></Icon>
                        <Header
                          size='tiny'
                          style={{
                            marginTop: "auto",
                            // alignSelf: "center",
                            paddigBottom: "0px",
                            marginBottom: "0px",
                          }}>
                          {activity.attendeeCount}{" "}
                          <p
                            style={{
                              color: "grey",
                              marginBottom: "0px",
                              display: "inline",
                            }}>
                            {"(" + activity.attendeeCountMax + ")"}
                          </p>
                        </Header>

                        {/* <br /> */}
                        {/* <span style={{ display: "flex" }}> */}

                        {/* </span> */}
                      </Grid.Column>

                      <Grid.Column
                        width={12}
                        textAlign='center'
                        verticalAlign='middle'
                        stretched>
                        <Image
                          src={
                            activity.imageUrl ??
                            `/assets/categoryImages/${activity.categories[0].name}.jpg`
                          }
                          style={{
                            borderRadius: "20px",
                            boxShadow: "0px 10px 2px 0px aliceblue",
                            // maxWidth: "18em",
                            // maxHeight: "13em",
                            maxWidth: "100%",
                            maxHeight: "250px",
                            alignSelf: "center",
                            objectFit: "none",
                          }}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={4} textAlign='center'>
                        <p
                          style={{
                            // color: "grey",
                            // fontSize: "12px",
                            marginBottom: "0px",
                            paddingBottom: "0px",
                          }}>
                          {format(activity.date!, "M/dd")}
                        </p>
                        {/* </Header> */}
                        <Header
                          size='tiny'
                          style={{
                            marginTop: "0px",
                            // padding: "0px",
                            marginBottom: "0px",
                            color: "#5162FA",
                            whiteSpace: "nowrap",
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
                        <p
                          style={{
                            color: "grey",
                            fontSize: "10px",
                            marginBottom: "-7px",
                          }}>
                          {Intl.DateTimeFormat().resolvedOptions().timeZone}
                        </p>
                      </Grid.Column>
                      <Grid.Column width={4} textAlign='center'>
                        <p style={{ fontSize: "small" }}>Duration</p>
                        <Header
                          // color='red'
                          size='tiny'
                          style={{
                            marginTop: "0px",
                            paddingLeft: "0px",
                            marginBottom: "0px",
                            color: "#5162FA",
                          }}>
                          <span
                            style={{
                              whiteSpace: "nowrap",
                              // color: "grey"
                            }}>
                            {activity.duration + " "}mins
                          </span>
                        </Header>{" "}
                      </Grid.Column>

                      {/* {format(activity.endDate!, "h:mm aa")} */}
                      {/* dd MMM h:mm aa */}
                      {/* {activity.endDate
                          ?.toLocaleTimeString()
                          .slice(-2)
                          .toLowerCase()} */}

                      <Grid.Column width={4} textAlign='center'>
                        <p style={{ fontSize: "small" }}>Skill Level</p>
                        <p>{SkillLevel[activity.skillLevel]}</p>
                      </Grid.Column>
                      <Grid.Column width={4} textAlign='center'>
                        <p style={{ fontSize: "small" }}>Language </p>
                        <p style={{ overflow: "hidden" }}>
                          {Language[activity.language]}
                        </p>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row
                      style={
                        {
                          // paddingBottom: "0px",
                          // paddingLeft: "15px",
                        }
                      }>
                      {activity.categories.map((c) => (
                        <Grid.Column
                          width={4}
                          textAlign='center'
                          style={{ paddingLeft: "0px" }}>
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
                        </Grid.Column>
                      ))}
                    </Grid.Row>
                    {activity.tag.length > 0 && (
                      <Grid.Row
                        style={{
                          paddingTop: "0px",
                          // paddingBottom: "0px",
                          // paddingLeft: "15px",
                          // marginBottom: "10px",
                        }}>
                        {activity.tag.map((t) => (
                          <Grid.Column width={4} textAlign='center'>
                            <p id='listTags'>#{t.name}</p>
                          </Grid.Column>
                        ))}
                      </Grid.Row>
                    )}
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
