import Avatar from "boring-avatars";
import { observer } from "mobx-react-lite";
import React from "react";
import {
  Divider,
  Grid,
  Header,
  Item,
  Segment,
  Statistic,
} from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import FollowButton from "./FollowButton";

interface Props {
  profile: Profile;
}

export default observer(function ProfileHeader({ profile }: Props) {
  return (
    <>
      <Grid style={{ marginBottom: "1%" }}>
        <Grid.Column width={10}>
          <Item.Group>
            <Item>
              {profile.image && (
                <Item.Image
                  avatar
                  size='massive'
                  src={profile.image || "/assets/user.png"}
                />
              )}

              {!profile.image && (
                <Avatar
                  size={200}
                  name={profile.username}
                  variant='beam'
                  colors={[
                    "#D8C395",
                    "#F77825",
                    "#F5F03A",
                    "#F1EFA5",
                    "#60BB99A",
                  ]}
                />
              )}
              <Item.Content
                style={{ marginTop: "4em", marginLeft: "2em" }}
                verticalAlign='middle'>
                <Item.Header>
                  <Header as='h1' content={profile.displayName} />
                </Item.Header>

                <Item.Meta>
                  {profile.followingCount} following{" "}
                  {" " + profile.followersCount} followers
                </Item.Meta>
                <Item.Extra>Reputation *NEW USER*</Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={6} textAlign='right' verticalAlign='bottom'>
          {/* <Statistic.Group widths={2}>
            <Statistic label='Followers' value={profile.followersCount} />
            <Statistic label='Following' value={profile.followingCount} />
          </Statistic.Group> */}
          {/* <Divider /> */}
          <FollowButton profile={profile} />
        </Grid.Column>
      </Grid>
    </>
  );
});
