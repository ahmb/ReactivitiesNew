import React, { Fragment, useContext, useState } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { Tab, Grid, Header, Button, Label, Checkbox, Image } from "semantic-ui-react";
import ProfileEditForm from "./ProfileEditForm";
import { Field } from "react-final-form";
import { category } from "../../app/common/options/categoryOptions";

const ProfileDescription = () => {
  const rootStore = useContext(RootStoreContext);
  const { updateProfile, profile, isCurrentUser } = rootStore.profileStore;
  const [editMode, setEditMode] = useState(false);
  return (
    <Tab.Pane>
      <Grid style={{ backgroundColor: "aliceblue" }}>
        <Grid.Column width={16}>
          {/* <Header
            floated="left"
            content={`About ${profile!.displayName}`}
          /> */}
          {isCurrentUser && (
            <Button
              floated="right"
              content={editMode ? "Cancel" : "Edit Profile"}
              onClick={() => setEditMode(!editMode)}
              circular
              color={editMode ? "grey" : "twitter"}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfileEditForm updateProfile={updateProfile} setEditMode={setEditMode} profile={profile!} />
          ) : (
            <Fragment>
              <Header as="h3" content="I am.." />

              <div
                style={{
                  borderRadius: "30px",
                  backgroundColor: "white",
                  padding: 10,
                  marginLeft:10
                }}
              >
                {profile!.bio}
              </div>

              <Header as="h3" content="I like to.." />
              {category.map(
                (cat) =>
                  profile?.interests.some((int) => int == cat.text) && (
                    <div
                      style={{
                        marginTop: 3,
                        marginLeft:10
                        // borderRadius: "30px",
                        // backgroundColor: "white",
                        // padding: 10,
                      }}
                    >
                      <Label image style={{ padding: 50 }} basic circular size='large' >
                        <Image src={`/assets/categoryImages/${cat.key}.png`} size='large'/>
                        {cat.text}
                      </Label>
                      <br />
                    </div>
                  )
              )}
            </Fragment>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default ProfileDescription;
