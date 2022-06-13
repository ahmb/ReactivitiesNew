import Avatar from "boring-avatars";
import format from "date-fns/format";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import {
  Segment,
  Item,
  Header,
  Button,
  Image,
  Label,
  Grid,
  Icon,
} from "semantic-ui-react";
import {
  ActivityDetails,
  ApprovalStatus,
  Language,
  SkillLevel,
} from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { categoryOptions } from "../../../app/common/options/categoryOptions";

// const activityImageStyle = {
//   filter: "brightness(30%)",
// };

// const activityImageTextStyle = {
//   position: "absolute",
//   bottom: "5%",
//   left: "5%",
//   width: "100%",
//   height: "auto",
//   color: "white",
// };

interface Props {
  activity: ActivityDetails;
}

export default observer(function ActivityDetailedHeader({ activity }: Props) {
  const {
    activityStore: { updateAttendance, loading },
    userStore: { isLoggedIn },
  } = useStore();

  return (
    <>
      <Button
        circular
        exact
        as={NavLink}
        to={"/"}
        style={{ boxShadow: "#969696 1px 3px 0px 0px" }}>
        <Icon name='angle left' />
        All Activities
      </Button>
      <Segment.Group>
        <Segment
          basic
          attached='top'
          style={{
            //  padding: "0",
            backgroundColor: "aliceBlue",
          }}>
          {activity.isCancelled && (
            <Label
              style={{ position: "absolute", zIndex: 1000, left: -14, top: 20 }}
              content='Cancelled'
              color='red'
              circular
              size='huge'
            />
          )}
          <Image
            centered
            src={
              activity.imageUrl ??
              categoryOptions.filter(
                (c) => c.value === activity.categories[0].name
              )[0].src
              // `/assets/categoryImages/${activity.categories[0].name}.jpg`
            }
            style={{
              borderRadius: "20px",
              boxShadow: "0px 10px 2px 0px #80808021",
              // maxWidth: "18em",
              // maxHeight: "13em",
              maxWidth: "100%",
              maxHeight: "100%",
              alignSelf: "center",
              objectFit: "fill",
            }}
          />
          <Segment
            // style={activityImageTextStyle}
            style={{ paddingBottom: "0px" }}
            basic>
            <Item.Group>
              <Item>
                <Item.Content style={{ textAlign: "center" }}>
                  <Header
                    size='huge'
                    content={activity.title}
                    textAlign='center'
                    style={{ marginBottom: "15px" }}
                  />
                  <Grid>
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
                    <Grid.Row centered verticalAlign='middle'>
                      <Grid.Column
                        verticalAlign='middle'
                        width={8}
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
                          as={Link}
                          to={`/profiles/${activity.host?.username}`}
                          style={{
                            marginTop: "auto",
                            alignSelf: "center",
                            alignItems: "center",
                          }}>
                          {activity.host?.displayName}
                        </Header>
                        {/* <br /> */}
                      </Grid.Column>
                      <Grid.Column
                        verticalAlign='middle'
                        width={8}
                        style={{ textAlign: "center", alignItems: "center" }}>
                        <Icon
                          name='users'
                          size='big'
                          color='grey'
                          style={
                            {
                              // paddigBottom: "0px",
                              // marginBottom: "0px",
                              // alignSelf: "center",
                            }
                          }></Icon>
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
                    </Grid.Row>
                  </Grid>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>
        {isLoggedIn && (
          <Segment clearing attached='bottom'>
            {
              activity.isHost ? (
                <>
                  <Button
                    circular
                    style={{
                      backgroundColor: "#e0e1e2",
                      color: "#525252",
                      boxShadow: "#969696 1px 3px 0px 0px",
                    }}
                    floated='right'
                    as={Link}
                    to={`/manage/${activity.id}`}>
                    Edit
                  </Button>
                </>
              ) : activity.isGoing ? (
                <>
                  <span>
                    🎉<i>Attendance confirmed</i>
                  </span>
                </>
              ) : activity.approvalStatus === ApprovalStatus.NotRequested ? (
                <Button
                  className='genericHoverButton'
                  onClick={updateAttendance}
                  disabled={activity.isCancelled}
                  circular
                  floated='right'
                  style={{
                    backgroundColor: "#5162FA",
                    color: "white",
                    boxShadow: "#404cb8 1px 3px 0px 0px",
                  }}
                  loading={loading}>
                  Request Invite
                </Button>
              ) : (
                // // activity.approvalStatus == ApprovalStatus.Pending ||
                // //   activity.approvalStatus == ApprovalStatus.Rejected ?
                <Button
                  onClick={updateAttendance}
                  disabled={true}
                  circular
                  floated='right'
                  style={{
                    backgroundColor: "#5162FA",
                    color: "white",
                    boxShadow: "#404cb8 1px 3px 0px 0px",
                  }}
                  loading={loading}>
                  Pending approval
                </Button>
              )
              // : (
              //   <>
              //     <span>
              //       🎉<i>Attendance confirmed</i>
              //     </span>
              //   </>
              // )
            }
          </Segment>
        )}
      </Segment.Group>
    </>
  );
});
