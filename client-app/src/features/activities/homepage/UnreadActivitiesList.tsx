import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Grid, Header, Image, Button, Card } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import NoNotificationsGraphic from "../../graphics/NoNotificationsGraphic";
import UnreadActivityItemPlaceholder from "./UnreadActivityItemPlaceholder";
import UserActivities from "./UserActivities";

const UnreadActivitiesList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadUnreadApprovals,
    loadingInitial,
    unreadActivitiesByActivity,
    unreadActivitiesArray,
    approveAttendance,
    rejectAttendance,
    loading,
    target,
  } = rootStore.activityStore;

  const [loadingFinished, setLoadingFinished] = useState(false);

  useEffect(() => {
    if (unreadActivitiesByActivity.length === 0) {
      loadUnreadApprovals();
      setLoadingFinished(true);
    }

    // loadUnreadApprovals();
  }, [loadUnreadApprovals, unreadActivitiesByActivity.length]);

  // if (loadingInitial)
  //   return <LoadingComponent content="Loading notifications..." />;

  return (
    <Grid>
      <Grid.Column >
        <Fragment>
          <Header
            icon="tasks"
            // id="funkyHeader"
            size="tiny"
            // floated="left"
            content="Notifications"
          />

          <br />
          {loadingInitial && (
            <Fragment>
              <UnreadActivityItemPlaceholder />
              <UnreadActivityItemPlaceholder />
              <UnreadActivityItemPlaceholder />
            </Fragment>
          )}
          {loadingFinished && unreadActivitiesArray.length === 0 && (
            <div 
            // style={{ display: "inline-block" }}
            >
              <Header size="medium">No new notifications! </Header>
              <Header size="tiny">You're all caught up</Header>
              {/* //wdith is 10% more than height */}
              <NoNotificationsGraphic
                width={300}
                height={250}
                style={{
                  display: "block",
                  margin: "auto",
                  marginTop: 70,
                  textAlign: "center",
                }}
              />
            </div>
          )}

          {unreadActivitiesByActivity.map(([group, unreadActivities]) => (
            <div key={group} style={{ marginTop: 10, marginBottom: 20 }}>
              <Header
                key={group}
                as={Link}
                to={`/activities/${unreadActivities[0].activityId}`}
                style={{ margin: 10 }}
              >
                {group}
              </Header>
              {/* as={Link} to={`/activities/${activity.id}` */}

              <Card.Group>
                {unreadActivities.map((a) => (
                  <Card
                    style={{
                      margin: 15,
                      marginTop: 30,
                      backgroundColor: "aliceblue",
                      borderColor: "aliceblue",
                      borderWidth: 1,
                      borderRadius: 30,
                      padding: 10,
                    }}
                  >
                    <Card.Content key={a.activityId + a.requestorUserName}>
                      <Image
                        avatar
                        floated="left"
                        spaced="left"
                        src={
                          a.requestorImage ||
                          "/assets/profpic.svg" ||
                          "/assets/user.png"
                        }
                        as={NavLink}
                        to={`/profile/${a.requestorUserName}`}
                      />
                      <Card.Description>
                        <Link to={`/profile/${a.requestorUserName}`}>
                          {a.requestorName}
                        </Link>{" "}
                        sent a request to join your activty!
                      </Card.Description>
                      <Card.Content extra style={{ marginTop: 10 }}>
                        <span>
                          <Button
                            positive
                            content={"Approve"}
                            basic
                            size="mini"
                            circular
                            icon="check"
                            onClick={(e) => approveAttendance(e, a)}
                            loading={
                              target ===
                                a.activityId +
                                  a.requestorUserName +
                                  "approve" && loading
                            }
                            name={
                              a.activityId + a.requestorUserName + "approve"
                            }
                          />
                          <Button
                            negative
                            content={"Reject"}
                            basic
                            size="mini"
                            circular
                            icon="times"
                            onClick={(e) =>
                              rejectAttendance(
                                e,
                                a.activityId,
                                a.requestorUserName
                              )
                            }
                            loading={
                              target ===
                                a.activityId + a.requestorUserName + "reject" &&
                              loading
                            }
                            name={a.activityId + a.requestorUserName + "reject"}
                          />
                        </span>
                      </Card.Content>
                    </Card.Content>
                  </Card>
                ))}
                <br />
              </Card.Group>
            </div>
          ))}
        </Fragment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(UnreadActivitiesList);
