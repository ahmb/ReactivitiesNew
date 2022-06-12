import React, { useState } from "react";
import { useStore } from "../../app/stores/store";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import ProfileEditForm from "./ProfileEditForm";
import { observer } from "mobx-react-lite";

export default observer(function ProfileAbout() {
  const { profileStore } = useStore();
  const { isCurrentUser, profile } = profileStore;
  const [editMode, setEditMode] = useState(false);

  return (
    <Tab.Pane style={{ minHeight: "500px", borderRadius: "20px" }}>
      <Grid>
        <Grid.Column width='16'>
          <Header floated='left' content={`About ${profile?.displayName}`} />
          {isCurrentUser && (
            <Button
              floated='right'
              circular
              style={{
                backgroundColor: "#e0e1e2",
                color: "#525252",
                boxShadow: "#969696 1px 3px 0px 0px",
              }}
              content={editMode ? "Cancel" : "Edit Profile"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width='16'>
          {editMode ? (
            <ProfileEditForm setEditMode={setEditMode} />
          ) : (
            <span style={{ whiteSpace: "pre-wrap" }}>{profile?.bio}</span>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
