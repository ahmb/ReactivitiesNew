import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card, Image, TabProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { IUserActivity } from "../../../app/models/profile";

const UserActivities = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadingActivities,
    loadUserActivitiesHomePage,
    userHostingActivities,
    userAttendingActivities,
  } = rootStore.profileStore!;
  const { user } = rootStore.userStore!;

  useEffect(() => {
    loadUserActivitiesHomePage(user!.username);
  }, [loadUserActivitiesHomePage, user]);

  return (
    <Grid>
      <Grid.Column width={16}>
        <Header
          size="tiny"
          floated="left"
        //   id="funkyHeader"
          icon="calendar alternate outline"
          content={"Hosting - Upcoming"}
        />
      </Grid.Column>
      <Grid.Column width={16}>
        <Card.Group itemsPerRow={3}>
          {userHostingActivities.map((activity: IUserActivity) => (
            <Card as={Link} to={`/activities/${activity.id}`} key={activity.id}>
              <Image
                src={`/assets/categoryImages/${activity.category}.jpg`}
                style={{ minHeight: 100, objectFit: "cover" }}
              />
              <Card.Content style={{backgroundColor:'aliceblue'}}>
                <Card.Header textAlign="center">{activity.title}</Card.Header>
                <Card.Meta textAlign="center">
                  <div>{format(new Date(activity.date+'Z'), "do LLL")}</div>
                  <div>{format(new Date(activity.date+'Z'), "h:mm a")}</div>
                </Card.Meta>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Grid.Column>
      <Grid.Column width={16}>
        <Header
          size="tiny"
        //   id="funkyHeader"
          floated="left"
          icon="calendar alternate outline"
          content={"Attending - Upcoming"}
        />
      </Grid.Column>
      <Grid.Column width={16}>
        <Card.Group itemsPerRow={3}>
          {userAttendingActivities.map((activity: IUserActivity) => (
            <Card as={Link} to={`/activities/${activity.id}`} key={activity.id}>
              <Image
                src={`/assets/categoryImages/${activity.category}.jpg`}
                style={{ minHeight: 100, objectFit: "cover" }}
              />
              <Card.Content  style={{backgroundColor:'aliceblue'}}>
                <Card.Header textAlign="center">{activity.title}</Card.Header>
                <Card.Meta textAlign="center">
                  <div>{format(new Date(activity.date+'Z'), "do LLL")}</div>
                  <div>{format(new Date(activity.date+'Z'), "h:mm a")}</div>
                </Card.Meta>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Grid.Column>
    </Grid>
  );
};

export default observer(UserActivities);
