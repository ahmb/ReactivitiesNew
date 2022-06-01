import React, { SyntheticEvent, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card, Image, TabProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { UserActivity } from "../../app/models/profile";
import { format } from "date-fns";
import { useStore } from "../../app/stores/store";

const panes = [
  { menuItem: "Invites", pane: { key: "requests" } },
  { menuItem: "Upcoming", pane: { key: "future" } },
  { menuItem: "Previous", pane: { key: "past" } },
];

export default observer(function ActivityLog() {
  const { profileStore } = useStore();
  const { loadUserActivities, profile, loadingActivities, userActivities } =
    profileStore;

  useEffect(() => {
    loadUserActivities(profile!.username);
  }, [loadUserActivities, profile]);

  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    loadUserActivities(
      profile!.username,
      panes[data.activeIndex as number].pane.key
    );
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
        loading={loadingActivities}>
        <Grid>
          <Grid.Column width={16} style={{ padding: "1%" }} textAlign='center'>
            <br />
            <Card.Group itemsPerRow={1}>
              {userActivities.map((activity: UserActivity) => (
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
