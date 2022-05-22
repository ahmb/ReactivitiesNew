import { useField } from "formik";
import React, { useEffect, useState } from "react";
import { Form, Label } from "semantic-ui-react";
import PhotoWidgetCropper from "../imageUpload/PhotoWidgetCropper";
import MyFileUploadPreview from "./MyFileUploadPreview";

interface Props {
  name: string;
  label?: string;
}

export default function MyFileUpload(props: Props) {
  const [field, meta, helpers] = useField(props.name);

  const [files, setFiles] = useState<any>([]);

  //using this to cleanup any memory
  // useEffect(() => {
  //   return () => {
  //     // if (file !== undefined || file !== null) {
  //     //   URL.revokeObjectURL(file.preview);
  //     // }

  //     files.forEach((file: any) => {
  //       URL.revokeObjectURL(file.preview);
  //     });
  //   };
  // }, [files, setFiles]);

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
          value={files[0] ?? undefined}
          onChange={(event) => {
            if (
              event.currentTarget.files !== null &&
              event.currentTarget.files[0] !== undefined
            ) {
              helpers.setValue(event?.currentTarget?.files[0]);
              setFiles(event?.currentTarget?.files[0]);
            }
          }}
        />
        {meta.touched && meta.error ? (
          <Label basic color='red'>
            {meta.error}
          </Label>
        ) : null}
      </Form.Field>
      <MyFileUploadPreview file={field.value} width={400} height={250} />

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
