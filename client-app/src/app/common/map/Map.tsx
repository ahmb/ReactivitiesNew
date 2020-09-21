import * as React from "react";
import { useState } from "react";
import ReactMapGL from "react-map-gl";
import MapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || "";

//toronto coordinates 43.706800, -79.398285


function Map() {
  const [viewport, setViewport] = useState({
    latitude: 43.706800,
    longitude: -79.398285,
    //zoom:11 seems to be good for the city view
    zoom: 11,
  });

  //   return (
  //     <ReactMapGL
  //       {...viewport}
  //       mapboxApiAccessToken={MAPBOX_TOKEN}
  //       onViewportChange={nextViewport => setViewport(nextViewport)}
  //     />

  return (
    <MapGL
      {...viewport}
      width="100vw"
      height="70vh"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      className='mapboxMap'
    />
  );
}


export default Map;
