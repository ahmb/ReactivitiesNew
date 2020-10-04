import React, { useEffect, useState } from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";
import Geocoder from "react-mapbox-gl-geocoder";
import TextInput from "./TextInput";

interface IProps
  extends FieldRenderProps<string, HTMLElement | HTMLInputElement>,
    FormFieldProps {}

const mapboxApiKey = process.env.REACT_APP_MAPBOX_TOKEN || "";

const params = {
  country: "ca,us",
};

const LocationInput: React.FC<IProps> = ({
  input,
  width,
  type,
  rows,
  placeholder,
  meta,
  setLatLong,
}) => {
//   const { value } = input;

  const [viewPort, setViewPort] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 15,
  });
  const { touched, error } = meta;
  const onSelected = (viewport: any, item: any) => {
    console.log(viewport);
    console.log(item);
    console.log(item.place_name);
    input.onChange(item.place_name);
    setLatLong(item.center[1],item.center[0])
  };

  const onChange = (e: any, data: any) => {
 console.log(e, data)
  };

  useEffect(() => {
    console.log(input.value);
    console.log(placeholder);
  });

  return (
    <Form.Field
      error={touched && !!error}
      rows={rows}
      type={type}
      width={width}
    >
      {/* <input {...input} placeholder={placeholder} /> */}
      {input.value && (
        <Geocoder
          mapboxApiAccessToken={mapboxApiKey}
          hideOnSelect={false}
          updateInputOnSelect={true}
          queryParams={params}
          onSelected={onSelected}
          initialInputValue={input.value}
          viewport={viewPort}
          limit={4}
          // inputComponent={<TextInput input={input} meta={meta} placeholder={placeholder}/>}
        />
      )}
      {!input.value && (
        <Geocoder
          mapboxApiAccessToken={mapboxApiKey}
          hideOnSelect={false}
          updateInputOnSelect={true}
          queryParams={params}
          onSelected={onSelected}
          initialInputValue={placeholder}
          // initialInputValue={value}
          viewport={viewPort}
          limit={4}
          // inputComponent={<TextInput input={input} meta={meta} placeholder={placeholder}/>}
        />
      )}
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default LocationInput;
