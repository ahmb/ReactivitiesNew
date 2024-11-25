import { SyntheticEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Tab,
  Grid,
  Header,
  Card,
  Image,
  TabProps,
  Button,
} from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { Profile, UserActivity } from "../../app/models/profile";
import { format } from "date-fns";
import { useStore } from "../../app/stores/store";
import { UnreadActivity } from "../../app/models/activity";
import Avatar from "boring-avatars";

const panes = [
  { menuItem: "Upcoming", pane: { key: "future" } },
  { menuItem: "Invites", pane: { key: "requests" } },
  { menuItem: "Previous", pane: { key: "past" } },
];

export default observer(function ActivityLog() {
  const { profileStore, activityStore } = useStore();
  const { loadUserActivities, profile, loadingActivities, userActivities } =
    profileStore;

  const {
    loadUnreadActivities,
    unreadActivities,
    loadingInitial,
    handleInvite,
    loadingApproveActivity,
    loadingRejectActivity,
  } = activityStore;

  const [currentTabName, setCurrentTabName] = useState("");

  useEffect(() => {
    // console.log("unread activities ");
    // unreadActivities.forEach((a) => console.log(a.date));

    // console.log("userActivities activities ");
    // userActivities.forEach((a) => console.log(a.date));

    // if (currentTabName === "") {
    loadUserActivities(profile!.username);
    // }
  }, [loadUserActivities, profile, unreadActivities?.length, setCurrentTabName]);

  const handleTabChange = (_e: SyntheticEvent, data: TabProps) => {
    console.log("activity log ");
    console.log(data);

    if (
      panes[data.activeIndex as number].pane.key === "future" ||
      panes[data.activeIndex as number].pane.key === "past"
    ) {
      setCurrentTabName("");
      loadUserActivities(
        profile!.username,
        panes[data.activeIndex as number].pane.key
      );
    }
    if (panes[data.activeIndex as number].pane.key === "requests") {
      loadUnreadActivities().then((response) => console.log(response));
      setCurrentTabName("requests");
    }
  };

  return (
    <>
      <Tab
        panes={panes}
        menu={{ secondary: true, pointing: true }}
        onTabChange={(e, data) => handleTabChange(e, data)}
        style={{}}
      />
      <Tab.Pane
        style={{
          background: "none",
          border: "none",
          minWidth: "100%",
        }}
        loading={loadingActivities || loadingInitial}>
        <Grid style={{ minHeight: "900px" }}>
          <Grid.Column width={16} style={{ padding: "1%" }} textAlign='center'>
            <br />

            <Card.Group itemsPerRow={1} centered>
              {/* <Card.Group itemsPerRow={1} style={{ minHeight: "100%" }} centered> */}
              {unreadActivities &&
                currentTabName === "requests" &&
                unreadActivities.length > 0 &&
                unreadActivities.map((unreadActivity: UnreadActivity) => (
                  <div
                    className='invitesForActivity'
                    key={unreadActivity.id}
                    style={{ margin: "20px" }}>
                    <NavLink to={`/activities/${unreadActivity.id}`}>
                      <Header>{unreadActivity.title}</Header>
                    </NavLink>
                    {unreadActivity.attendees.map((attendee: Profile) => (
                      <Card
                        centered
                        key={attendee.username}
                        style={{
                          borderRadius: "20px",
                        }}>
                        <Card.Content>
                          {!attendee.image && (
                            <NavLink to={`/profiles/${attendee.username}`}>
                              <Avatar
                                size={65}
                                name={attendee.username}
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
                          {attendee.image && (
                            <Image
                              // floated='right'
                              size='mini'
                              src={attendee.image}
                              circular
                              style={{ height: 65, width: 65 }}
                              as={NavLink}
                              to={`/profiles/${attendee.username}`}
                            />
                          )}
                          <Card.Header>{attendee.displayName}</Card.Header>
                          <Card.Meta>
                            <div>@{attendee.username}</div>
                          </Card.Meta>
                          <Card.Description>
                            {attendee.displayName} would like to join your
                            activity
                          </Card.Description>
                          <Card.Content extra>
                            <div
                            //  className='ui two buttons'
                            >
                              <Button
                                circular
                                onClick={() => {
                                  handleInvite(
                                    true,
                                    unreadActivity.id,
                                    attendee.username
                                  );
                                }}
                                loading={
                                  loadingApproveActivity === unreadActivity.id
                                }
                                color='green'
                                style={{
                                  boxShadow: "#248039 1px 3px 0px 0px",
                                }}>
                                Approve
                              </Button>
                              <Button
                                circular
                                onClick={() => {
                                  handleInvite(
                                    false,
                                    unreadActivity.id,
                                    attendee.username
                                  );
                                }}
                                loading={
                                  loadingRejectActivity === unreadActivity.id
                                }
                                color='red'
                                style={{
                                  boxShadow: "#c50000 1px 3px 0px 0px",
                                }}>
                                Decline
                              </Button>
                            </div>
                          </Card.Content>
                        </Card.Content>
                      </Card>
                    ))}
                  </div>
                ))}
              {currentTabName !== "requests" &&
                userActivities.map((activity: UserActivity) => (
                  <Card
                    style={{ borderRadius: "20px", padding: "10px" }}
                    as={Link}
                    to={`/activities/${activity.id}`}
                    key={activity.id}>
                    <Card.Content>
                      <Card.Header textAlign='center'>
                        {activity.title}
                      </Card.Header>
                      <Card.Meta textAlign='center'>
                        <div>
                          {format(new Date(activity.date), "eeee do MMMM")}
                        </div>
                        <div>{format(new Date(activity.date), "h:mm a")}</div>
                      </Card.Meta>
                    </Card.Content>
                    <Card.Description>
                      Hosted by @ {activity.hostUsername}
                      {/* <NavLink to={`/profiles/${activity.hostUsername}`}> */}
                      {/* </NavLink> */}
                    </Card.Description>
                  </Card>
                ))}
            </Card.Group>
          </Grid.Column>
        </Grid>
      </Tab.Pane>
    </>
  );
});
