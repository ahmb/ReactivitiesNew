import * as React from "react";
import { Fragment, useCallback, useContext, useRef, useState } from "react";
import ReactMapGL, {
  GeolocateControl,
  InteractiveMap,
  Marker,
  Popup,
} from "react-map-gl";
import MapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { RootStoreContext } from "../../stores/rootStore";
import { IActivity } from "../../models/activity";
import Pin from "./pin";
import { observer } from "mobx-react-lite";
import mapboxgl from "mapbox-gl";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || "";

//toronto coordinates 43.706800, -79.398285

const Mapi: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { activityRegistry } = rootStore.activityStore;

  const [viewport, setViewport] = useState({
    latitude: 43.7068,
    longitude: -79.398285,
    //zoom:11 seems to be good for the city view
    zoom: 11,
  });
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );
  const geocoderContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<InteractiveMap | null>(null);

  const popUpStyle: React.CSSProperties = {
    display: "none",
  };

  const [toolTipArray, setToolTipArray] = useState<string[]>([]);

  const geolocateStyle: React.CSSProperties = {
    position: "absolute",
    top: 200,
    left: 200,
    margin: 10,
  };

  return (
    <div style={{}}>
      <div
        ref={geocoderContainerRef}
        style={{ position: "absolute", top: 50, left: 50, zIndex: 1 }}
      />
      <MapGL
        {...viewport}
        width="100vw"
        height="70vh"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        className="mapboxMap"
        ref={mapRef}
      >
        <Geocoder
          mapRef={mapRef}
          containerRef={geocoderContainerRef}
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
          className="geoCoder"
        />
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />

        {Array.from(activityRegistry.values()).map((activity: IActivity) => (
          <Fragment key={activity.id + "f"}>
            <div
              onMouseOver={() => {
                var find = toolTipArray.find(
                  (element) => element === activity.id
                );
                if (!find) {
                  setToolTipArray([...toolTipArray, activity.id]);
                }
              }}
              onMouseLeave={() => {
                var find = toolTipArray.find(
                  (element) => element === activity.id
                );
                if (find) {
                  setToolTipArray(
                    toolTipArray.filter((el) => el !== activity.id)
                  );
                }
              }}
              // onClick={() => {
              //   var find = toolTipArray.find(
              //     (element) => element === activity.id
              //   );
              //   if (find) {
              //     setToolTipArray(
              //       toolTipArray.filter((el) => el !== activity.id)
              //     );
              //   } else {
              //     setToolTipArray([...toolTipArray, activity.id]);
              //   }
              //   // console.log(toolTipArray);
              // }}
            >
              <Marker
                key={activity.id}
                longitude={activity.longitude}
                latitude={activity.latitude}
              >
                <Pin size={30} />
              </Marker>
            </div>
            

            {toolTipArray.some((v, i, a) => v === activity.id) && (
              <Popup
                key={activity.id + "p"}
                offsetLeft={15}
                offsetTop={0}
                latitude={activity.latitude}
                longitude={activity.longitude}
                anchor="bottom"
                tipSize={10}
                closeButton={false}
                closeOnClick={false}
              >
                <div>{activity.title}</div>
              </Popup>
            )}
          </Fragment>
        ))}
      </MapGL>
    </div>
  );
};

export default observer(Mapi);
