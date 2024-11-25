import { observer } from "mobx-react-lite";
import { SyntheticEvent } from "react";
import { Reveal, Button } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
  profile: Profile;
}

export default observer(function FollowButtion({ profile }: Props) {
  const { profileStore, userStore } = useStore();
  const { updateFollowing, loading } = profileStore;

  if (userStore.user?.username === profile.username) return null;

  function handleFollow(e: SyntheticEvent, username: string) {
    e.preventDefault();
    profile.following
      ? updateFollowing(username, false)
      : updateFollowing(username, true);
  }

  return (
    <>
      {/* <Reveal.Content visible style={{ width: "100%" }}>
        <Button
          fluid
          color='grey'
          content={profile.following ? "Following" : "Not following"}
        />
      </Reveal.Content> */}

      {/* <Reveal.Content hidden style={{ width: "100%" }}> */}
      <Button
        circular
        color={profile.following ? "red" : "green"}
        content={profile.following ? "Unfollow" : "Follow"}
        loading={loading}
        onClick={(e) => handleFollow(e, profile.username)}
        style={
          profile.following
            ? { boxShadow: "#c50000 1px 3px 0px 0px", margin: "1%" }
            : { boxShadow: "#198933 1px 3px 0px 0px", margin: "1%" }
        }
      />
      {/* </Reveal.Content> */}
    </>
  );
});
