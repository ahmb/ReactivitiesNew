import React, { Fragment } from "react";
import {
  Segment,
  Item,
  Header,
  Button,
  Grid,
  Statistic,
  Divider,
  Reveal,
} from "semantic-ui-react";
import { IProfile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";

interface IProps {
  profile: IProfile;
  isCurrentUser: boolean;
  loading: boolean;
  follow: (username: string) => void;
  unfollow: (username: string) => void;
}

const ProfileHeader: React.FC<IProps> = ({
  profile,
  isCurrentUser,
  loading,
  follow,
  unfollow,
}) => {
  return (
    <Segment basic>
      <Grid>
        <Grid.Column>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="medium"
                src={profile.image || "/assets/user.png"}
              />
              <Item.Content verticalAlign="middle">
                <Header as="h1" style={{ color: "#dc493a" }}>
                  {profile.displayName}
                </Header>
                <br />
                <Header as="h3">@{profile.username}</Header>
                <br />

                <Statistic.Group size="mini">
                  <Statistic>
                    {" "}
                    <Statistic.Label>Followers</Statistic.Label>
                    <Statistic.Value>{profile.followersCount}</Statistic.Value>
                  </Statistic>
                  <Statistic>
                    {" "}
                    <Statistic.Label>Followers</Statistic.Label>
                    <Statistic.Value>{profile.followingCount}</Statistic.Value>
                  </Statistic>
                </Statistic.Group>
                {!isCurrentUser && (
                  <Button
                    circular
                    floated="left"
                    color={profile.following ? "twitter" : "green"}
                    content={profile.following ? "Unfollow" : "Follow"}
                    onClick={
                      profile.following
                        ? () => unfollow(profile.username)
                        : () => follow(profile.username)
                    }
                    loading={loading}
                    style={{ marginTop: 20 }}
                  />
                )}
                {!isCurrentUser && (
                  <Fragment>
                    {/* <Reveal animated="move">
                      <Reveal.Content visible style={{ width: "100%" }}>
                        <Button
                          fluid
                          color="teal"
                          content={
                            profile.following ? "Following" : "Not Following"
                          }
                          floated="right"
                        />
                      </Reveal.Content>
                      <Reveal.Content hidden>
                        <Button
                          fluid
                          basic
                          floated="right"
                          color={profile.following ? "red" : "green"}
                          content={profile.following ? "Unfollow" : "Follow"}
                          onClick={
                            profile.following
                              ? () => unfollow(profile.username)
                              : () => follow(profile.username)
                          }
                          loading={loading}
                        />
                      </Reveal.Content>
                    </Reveal> */}
                  </Fragment>
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        {/* <Grid.Column width={4}> */}
        {/* <Statistic.Group widths={2}>
            <Statistic label="Followers" value={profile.followersCount} />
            <Statistic label="Following" value={profile.followingCount} />
          </Statistic.Group> */}
        {/* </Grid.Column> */}
      </Grid>
    </Segment>
  );
};

export default observer(ProfileHeader);
