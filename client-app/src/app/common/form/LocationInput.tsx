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
  country: "ca",
};

const LocationInput: React.FC<IProps> = ({
  input,
  width,
  type,
  rows,
  placeholder,
  meta,
}) => {
  const { value } = input;

  const [viewPort, setViewPort] = useState({
    latitude: 45.50884,
    longitude: -73.58781,
    zoom: 15,
  });
 const {touched, error } = meta
  const onSelected = (viewport: any, item: any) => {
    console.log(viewport);
    console.log(item);
  };

  useEffect(() => {
    console.log(value);
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
      {value &&
            <Geocoder
            mapboxApiAccessToken={mapboxApiKey}
            hideOnSelect={false}
            updateInputOnSelect={true}
            queryParams={params}
            onSelected={onSelected}
            initialInputValue={value}
            // initialInputValue={value}
            viewport={viewPort}
            limit={4}
            // inputComponent={<TextInput input={input} meta={meta} placeholder={placeholder}/>}
          />
      }
   {!value &&    <Geocoder
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
      />}
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default LocationInput;
