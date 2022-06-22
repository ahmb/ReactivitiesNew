import format from "date-fns/format";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Item,
  Segment,
  Icon,
  Label,
  Container,
  Image,
  Grid,
  Header,
} from "semantic-ui-react";
import { Activity, Language, SkillLevel } from "../../../app/models/activity";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import Avatar from "boring-avatars";
import { useMediaQuery } from "../../../app/common/util/hooks";

interface Props {
  activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {
  const isNotMobile = useMediaQuery("(min-width: 450px)");

  return (
    <Segment.Group
      raised
      className='activityDateGroup'
      style={{ borderRadius: "40px" }}>
      <Segment
        style={{
          borderTopLeftRadius: "40px",
          borderTopRightRadius: "40px",
          paddingBottom: "5px",
        }}>
        <Container
          style={{
            paddingLeft: "10px",
            paddingTop: "20px",
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

          {activity.date!.getDate() === new Date().getDate() &&
            activity.date!.getHours() === new Date().getHours() && (
              <>
                <Label
                  // circular
                  horizontal
                  size='large'
                  attached='top'
                  style={{
                    // marginTop: "-10px",
                    marginRight: "20px",
                    backgroundColor: "#5162FA",
                    paddingTop: "20px",
                    color: "white",
                  }}>
                  <Icon size='large' name='podcast' />
                  LIVE
                </Label>
                <br />
              </>
            )}

          {activity.isHost && (
            <Label
              circular
              horizontal
              attached='top right'
              style={{
                marginTop: "20px",
                marginBottom: "10px",
                marginRight: "20px",
                backgroundColor: "#37cf37",
                color: "white",
              }}>
              hosting
            </Label>
          )}
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
        <Item.Group
          style={{
            borderRadius: "inherit",
            paddingTop: "0px",
          }}>
          <Item style={{ paddingBottom: "0px", marginBottom: "0px" }}>
            <Item.Content style={{ width: "100%" }}>
              <Item.Header
                as={Link}
                to={`/activities/${activity.id}`}
                style={
                  activity.isHost
                    ? {
                        paddingBottom: "20px",
                        paddingLeft: "2%",
                        paddingRight: "2%",
                        paddingTop: "2%",
                      }
                    : {
                        paddingBottom: "20px",
                        paddingLeft: "2%",
                        paddingRight: "2%",
                        paddingTop: "0px",
                      }
                }>
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
                              style={{ height: 40, width: 40 }}
                              as={NavLink}
                              to={`/profiles/${activity.host?.username}`}
                            />
                          )}
                          {!activity.host?.image && (
                            <NavLink
                              to={`/profiles/${activity.host?.username}`}>
                              <Avatar
                                size={40}
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
                          <br />
                          <span>
                            <Icon
                              name='star'
                              size='small'
                              style={{ color: "#FFD700" }}
                            />
                            {/* <Icon name='star outline' size='small' />
                            <Icon name='star outline' size='small' /> */}
                          </span>
                        </Header>
                        {/* <br /> */}
                        <Icon
                          name='users'
                          size='large'
                          color='grey'
                          style={{
                            paddigBottom: "0px",
                            marginBottom: "0px",
                            // marginTop: "20%",

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
                            categoryOptions.filter(
                              (c) => c.value === activity.categories[0].name
                            )[0].src
                            // `/assets/categoryImages/${activity.categories[0].name}.jpg`
                          }
                          style={
                            isNotMobile
                              ? {
                                  borderRadius: "20px",
                                  boxShadow: "0px 10px 2px 0px aliceblue",
                                  // maxWidth: "18em",
                                  // maxHeight: "13em",
                                  maxWidth: "100%",
                                  maxHeight: "25vh",
                                  alignSelf: "center",
                                  objectFit: "none",
                                }
                              : {
                                  borderRadius: "20px",
                                  boxShadow: "0px 10px 2px 0px aliceblue",
                                  // maxWidth: "18em",
                                  // maxHeight: "13em",
                                  maxWidth: "100%",
                                  maxHeight: "15vh",
                                  alignSelf: "center",
                                  objectFit: "none",
                                }
                          }
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
                            marginBottom: "10px",
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
                        <p style={{ fontSize: "small" }}>Skill</p>
                        <p>{SkillLevel[activity.skillLevel]}</p>
                      </Grid.Column>
                      <Grid.Column width={4} textAlign='center'>
                        <p style={{ fontSize: "small" }}>Language </p>
                        <p style={{ overflow: "hidden" }}>
                          {Language[activity.language]}
                        </p>
                      </Grid.Column>
                    </Grid.Row>

                    {/* {activity.tag.length > 0 && (
                      <Grid.Row
                        style={{
                          paddingTop: "0px",
                          // paddingBottom: "0px",
                          // paddingLeft: "15px",
                          // marginBottom: "10px",
                        }}>
                        {activity.tag.map((t) => (
                          <Grid.Column
                            key={t.name}
                            width={4}
                            textAlign='center'>
                            <p id='listTags'>
                              {" "}
                              <span className='fontColor'>#</span>
                              {t.name}
                            </p>
                          </Grid.Column>
                        ))}
                      </Grid.Row>
                    )} */}
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
          borderBottomRightRadius: "40px",
          borderBottomLeftRadius: "40px",
          padding: "10px",
          // paddingLeft: "30px",
          borderTop: "none",
          paddingTop: "0px",
        }}
        clearing>
        <Grid style={{ padding: "10px", paddingTop: "5px" }}>
          <Grid.Row
            style={{ paddingBottom: "0px", paddingTop: "5px" }}
            // style={{ paddingTop: "10px", paddingBottom: "5px" }}
            verticalAlign='middle'>
            {activity.categories.map((c) => (
              <Grid.Column
                key={c.name}
                width={4}
                textAlign='center'
                style={{ paddingLeft: "0px" }}>
                <p id='listCategories' key={c.name}>
                  {categoryOptions.filter((co) => co.value === c.name)[0].icon +
                    " " +
                    categoryOptions.filter((co) => co.value === c.name)[0]
                      .text +
                    "  "}
                </p>
              </Grid.Column>
            ))}
          </Grid.Row>

          {activity.tag.length > 0 && (
            <Grid.Row
              style={{ paddingTop: "5px" }}
              verticalAlign='middle'
              // style={{
              //   paddingTop: "0px",
              // paddingBottom: "0px",
              // paddingLeft: "15px",
              // marginBottom: "10px",
              // }}
            >
              {activity.tag.map((t) => (
                <Grid.Column key={t.name} width={4} textAlign='center'>
                  <p id='listTags'>
                    {" "}
                    <span className='fontColor'>#</span>
                    {t.name}
                  </p>
                </Grid.Column>
              ))}
            </Grid.Row>
          )}
        </Grid>
        {/* <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated='right'
          content='View'
          className='viewButton'
          size='large'
          circular
          style={{
            margin: "10px",
            boxShadow: "#404cb8 1px 3px 0px 0px",
            backgroundColor: "#5162FA",
            color: "white",
          }}
        /> */}
      </Segment>
    </Segment.Group>
  );
}
