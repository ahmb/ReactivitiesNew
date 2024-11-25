import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Header,
  Icon,
  SemanticCOLORS,
  StrictHeaderProps,
} from "semantic-ui-react";
import { IconSizeProp } from "semantic-ui-react/dist/commonjs/elements/Icon/Icon";

interface Props extends StrictHeaderProps {
  setFiles: (files: any) => void;
  customDzStyles?: {};
  headerContent?: string;
  headerColor?: SemanticCOLORS;
  circular?: boolean;
  iconSize?: IconSizeProp;
  size?: any;
}

export default function PhotoWidgetDropzone({
  setFiles,
  customDzStyles,
  headerContent,
  headerColor,
  circular,
  iconSize,
  size,
}: Props) {
  const dzStylesOriginal = {
    border: "dashed 3px #eee",
    borderColor: "#eee",
    borderRadius: "5px",
    paddingTop: "30px",
    textAlign: "center" as "center",
    height: 200,
  };

  const dzStyles = { ...dzStylesOriginal, ...customDzStyles };

  const dzActive = {
    borderColor: "green",
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      style={isDragActive ? { ...dzStyles, ...dzActive } : { ...dzStyles }}>
      <input {...getInputProps()} />
      <Icon
        name='upload'
        size={iconSize ?? "huge"}
        circular={circular ?? false}
      />
      <Header
        content={headerContent ?? "Drop image here"}
        color={headerColor ?? "black"}
        size={size ?? "large"}
      />
    </div>
  );
}
