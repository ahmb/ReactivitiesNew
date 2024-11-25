import { useEffect, useState } from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

interface Props {
  uploadPhoto: (file: Blob) => void;
  loading: boolean;
}

export default function PhotoUploadSimpleWidget({
  uploadPhoto,
  loading,
}: Props) {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
    }
  }

  //using this to cleanup any memory
  useEffect(() => {
    return () => {
      files.forEach((file: any) => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  return (
    <Grid>
      <Grid.Column width={4}>
        <PhotoWidgetDropzone
          setFiles={setFiles}
          customDzStyles={{ border: "none" }}
          headerContent={"Upload Picture (Optional)"}
          headerColor='grey'
          circular={true}
          iconSize='big'
          size='small'
        />
      </Grid.Column>
      {files && files.length > 0 && (
        <div style={{ display: "none" }}>
          <PhotoWidgetCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        </div>
      )}
      <Grid.Column width={12}>
        <Grid.Row>
          {/* <Header sub color='grey' content='Preview and confirm' /> */}
          {files && files.length > 0 && (
            <>
              <div
                className='img-preview'
                style={{ minHeight: 200, overflow: "hidden" }}
              />
              <Button.Group widths={12}>
                <Button
                  onClick={onCrop}
                  positive
                  icon='check'
                  loading={loading}
                />
                <Button
                  disabled={loading}
                  onClick={() => setFiles([])}
                  icon='close'
                />
              </Button.Group>
            </>
          )}
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
}
