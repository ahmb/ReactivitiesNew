import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Card, Header, Tab, Image, Grid, Button } from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { IPhoto, Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
  profile: Profile;
}

export default observer(function ProfilePhotos({ profile }: Props) {
  const {
    profileStore: {
      isCurrentUser,
      uploadProfilePhoto,
      uploading,
      loading,
      setMainPhoto,
      deletePhoto,
    },
  } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);

  const [target, setTarget] = useState("");

  function handlePhotoUpload(file: Blob) {
    uploadProfilePhoto(file).then(() => setAddPhotoMode(false));
  }

  function handleSetMainPhoto(
    photo: IPhoto,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  }

  function handleDeletePhoto(
    photo: IPhoto,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
  }

  return (
    <Tab.Pane style={{ minHeight: "500px", borderRadius: "20px" }}>
      <Grid>
        <Grid.Column width={16}>
          <Header content='Photos' floated='left' />
          {isCurrentUser && (
            <Button
              floated='right'
              circular
              style={{
                backgroundColor: "#e0e1e2",
                color: "#525252",
                boxShadow: "#969696 1px 3px 0px 0px",
              }}
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget
              uploadPhoto={handlePhotoUpload}
              loading={uploading}
            />
          ) : (
            <Card.Group itemsPerRow={2}>
              {profile.photos?.map((photo) => (
                <Card key={photo.id} style={{ maxHeight: "450px" }}>
                  <Image src={photo?.url} style={{ maxHeight: "400px" }} />
                  {isCurrentUser && (
                    <Button.Group fluid widths={2}>
                      <Button
                        color='green'
                        content='Set Main'
                        name={"main" + photo.id}
                        disabled={photo.isMain}
                        loading={target === "main" + photo.id && loading}
                        onClick={(e) => handleSetMainPhoto(photo, e)}
                      />
                      <Button
                        basic
                        colors='red'
                        icon='trash'
                        name={photo.id}
                        disabled={photo.isMain}
                        loading={target === photo.id && loading}
                        onClick={(e) => handleDeletePhoto(photo, e)}
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
