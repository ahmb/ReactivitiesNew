import React, { useEffect, useState } from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

interface Props {
  uploadPhoto: (file: Blob) => void;
  loading: boolean;
}

export default function PhotoUploadWidget({ uploadPhoto, loading }: Props) {
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
        <Header sub color='teal' content='Step1 - Add Photo' />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step2 - Resize Image' />
        {files && files.length > 0 && (
          <PhotoWidgetCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step3 - Preview & Upload' />
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
      </Grid.Column>
    </Grid>
  );
}