import React from "react";
import { observer } from "mobx-react-lite";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const ActivityMap = withScriptjs(
  withGoogleMap((props: any) => {
    return (
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        {props.isMarkerShown && (
          <Marker position={{ lat: -34.397, lng: 150.644 }} />
        )}
      </GoogleMap>
    );
  })
);

export default ActivityMap
