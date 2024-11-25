import { useField } from "formik";
import { useState } from "react";
import { Form, Label } from "semantic-ui-react";
import MyFileUploadPreview from "./MyFileUploadPreview";

interface Props {
  name: string;
  label?: string;
  imageUrl?: string;
}

export default function MyFileUpload(props: Props) {
  const [field, meta, helpers] = useField(props.name);

  const [files, setFiles] = useState<any>([]);

  return (
    <>
      <Form.Field error={meta.touched && !!meta.error}>
        <label>{props.label}</label>

        {/* Object.assign(file, {
            preview: URL.createObjectURL(file),
          }) */}
        <input
          {...field}
          id='file'
          name={props.name ?? "file"}
          type='file'
          value={files !== null ? files[0] : undefined}
          onChange={(event) => {
            // if (
            //   event.currentTarget.files !== null &&
            //   event.currentTarget.files[0] !== undefined
            // ) {
            //   helpers.setValue(event?.currentTarget?.files[0]);
            //   setFiles(event?.currentTarget?.files[0]);
            // }
            if (
              event.currentTarget.files !== null &&
              event.currentTarget.files[0] !== undefined
            ) {
              helpers.setValue(event?.currentTarget?.files![0]);
              setFiles(event?.currentTarget?.files![0]);
            } else {
              helpers.setValue(undefined);
              setFiles(null);
            }
          }}
        />
        {meta.touched && meta.error ? (
          <Label basic color='red'>
            {meta.error}
          </Label>
        ) : null}
      </Form.Field>
      <MyFileUploadPreview
        file={field.value}
        width={"23em"}
        height={"23em"}
        imageUrl={props.imageUrl}
      />

      {/* {files && files.length > 0 && (
        <div
        //  style={{ display: "none" }}
        >
          <PhotoWidgetCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        </div>
      )}
      {files && files.length > 0 && (
        <div
          className='img-preview'
          style={{ minHeight: 200, overflow: "hidden" }}>
          Preview
        </div>
      )} */}
    </>
  );
}
