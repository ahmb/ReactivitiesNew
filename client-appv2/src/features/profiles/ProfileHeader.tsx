import Avatar from "boring-avatars";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React from "react";
import {
  Divider,
  Grid,
  Header,
  Icon,
  Item,
  Popup,
  Segment,
  Statistic,
} from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import FollowButton from "./FollowButton";

interface Props {
  profile: Profile;
}

export default observer(function ProfileHeader({ profile }: Props) {
  const {
    userStore: { isLoggedIn },
  } = useStore();

  return (
    <>
      <Grid style={{ marginBottom: "1%" }}>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              {profile.image && (
                <Item.Image
                  avatar
                  size='large'
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
                <Item.Extra>
                  <p>Joined - {format(profile.dateJoined, "M/yy")}</p>

                  <span>
                    <Icon name='star' size='large' />
                    <Icon name='star outline' size='large' />
                    <Icon name='star outline' size='large' />
                  </span>
                  <Popup trigger={<span className='altFontColor'>*</span>}>
                    <span className='altFontColor'>*</span>Reputation goes up
                    with positive feedback and time
                  </Popup>
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4} textAlign='right' verticalAlign='bottom'>
          {/* <Statistic.Group widths={2}>
            <Statistic label='Followers' value={profile.followersCount} />
            <Statistic label='Following' value={profile.followingCount} />
          </Statistic.Group> */}
          {/* <Divider /> */}
          {isLoggedIn && <FollowButton profile={profile} />}
        </Grid.Column>
      </Grid>
    </>
  );
});
