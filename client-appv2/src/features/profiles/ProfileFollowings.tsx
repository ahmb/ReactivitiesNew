import { observer } from "mobx-react-lite";

import { Card, Grid, Header, Tab } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ProfileCard from "./ProfileCard";

export default observer(function ProfileFollowings() {
  const { profileStore } = useStore();
  const { followings, loadingFollowings } = profileStore;

  return (
    <Tab.Pane
      loading={loadingFollowings}
      style={{ minHeight: "300px", borderRadius: "20px" }}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            // content={
            //   activeTab === 3
            //     ? `${profile!.displayName}s followers`
            //     : `${profile!.displayName} is following`
            // }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={2}>
            {followings.map((profile) => (
              <ProfileCard key={profile.username} profile={profile} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
