import React, { SyntheticEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card, Image, TabProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { UserActivity } from "../../app/models/profile";
import { format } from "date-fns";
import { useStore } from "../../app/stores/store";
import {
  IUserActivitiesUnreadDto,
  UnreadActivity,
} from "../../app/models/activity";

const panes = [
  { menuItem: "Upcoming", pane: { key: "future" } },
  { menuItem: "Invites", pane: { key: "requests" } },
  { menuItem: "Previous", pane: { key: "past" } },
];

export default observer(function ActivityLog() {
  const { profileStore, activityStore } = useStore();
  const { loadUserActivities, profile, loadingActivities, userActivities } =
    profileStore;

  const { loadUnreadActivities, unreadActivities, loadingInitial } =
    activityStore;

  const [currentTabName, setCurrentTabName] = useState("");

  useEffect(() => {
    if (currentTabName === "") {
      loadUserActivities(profile!.username);
    }
  }, [loadUserActivities, profile, unreadActivities?.length, setCurrentTabName]);

  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
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
          minHeight: "100%",
          mainWidth: "100%",
        }}
        loading={loadingActivities || loadingInitial}>
        <Grid>
          <Grid.Column width={16} style={{ padding: "1%" }} textAlign='center'>
            <br />

            <Card.Group itemsPerRow={1} style={{ minHeight: "100%" }}>
              {unreadActivities &&
                currentTabName === "requests" &&
                unreadActivities.length > 0 &&
                unreadActivities.map(
                  (unreadActivity: UnreadActivity, index) => (
                    <Card key={index}>{unreadActivity.title}</Card>
                  )
                )}
              {currentTabName !== "requests" &&
                userActivities.map((activity: UserActivity) => (
                  <Card
                    as={Link}
                    to={`/activities/${activity.id}`}
                    key={activity.id}>
                    <Image
                      src={`/assets/categoryImages/${activity.category}.jpg`}
                      style={{ minHeight: 100, objectFit: "cover" }}
                    />
                    <Card.Content>
                      <Card.Header textAlign='center'>
                        {activity.title}
                      </Card.Header>
                      <Card.Meta textAlign='center'>
                        <div>{format(new Date(activity.date), "do LLL")}</div>
                        <div>{format(new Date(activity.date), "h:mm a")}</div>
                      </Card.Meta>
                    </Card.Content>
                  </Card>
                ))}
            </Card.Group>
          </Grid.Column>
        </Grid>
      </Tab.Pane>
    </>
  );
});
