import React, { useEffect, useState } from "react";
import { Form, Label } from "semantic-ui-react";

interface Props {
  file: any;
  label?: string;
  height?: string;
  width?: string;
  imageUrl?: string;
}

export default function MyFileUploadPreview(props: Props) {
  const [loading, setLoading] = useState(false);

  const [thumb, setThumb] = useState<any>(undefined);

  //using this to cleanup any memory
  useEffect(() => {
    //TODO: remove logging
    console.log("LOGGING0");
    if (!props.file) return;
    console.log("LOGGING1");
    // if (props.file === null || props.file === undefined) return;
    setLoading(true);
    console.log("LOGGING2");
    console.log(thumb);

    let reader = new FileReader();

    reader.onloadend = () => {
      setThumb(reader.result);
      setLoading(false);
    };

    console.log(reader.result);
    console.log(thumb);

    reader.readAsDataURL(props.file);

    return () => {
      reader.abort();
    };
  }, [thumb, props.file]);

  if (!props.file && !props.imageUrl) return null;

  return (
    <>
      <label>{props.label}</label>
      <img
        src={props.imageUrl ?? (thumb as any) ?? undefined}
        alt={props?.file?.name ?? undefined}
        className='img-thumbnail mt-2'
        // height={props.height ?? 200}
        // width={props.width ?? 200}
        style={{
          maxHeight: props.height ?? "200px",
          maxWidth: props.width ?? "200px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "30px",
          marginBottom: "20px",
        }}
      />
    </>
  );
}
