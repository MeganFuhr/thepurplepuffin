import React, { useState, useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import star from "../img/icon-star.png";
import Zoom from "ol/control/Zoom";

//https://taylor.callsen.me/using-openlayers-with-react-functional-components/
export default function GetMap(lon, lat) {
  const [map, setMap] = useState();
  const mapElement = useRef();
  const mapRef = useRef();
  mapRef.current = map;

  useEffect(() => {
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [
              new Feature({
                geometry: new Point([lon, lat]),
              }),
            ],
          }),
          style: new Style({
            image: new Icon({
              anchor: [0.5, 24], //24px is the height of the image
              anchorXUnits: "fraction",
              anchorYUnits: "pixels",
              src: star,
            }),
          }),
        }),
      ],
      view: new View({
        controls: [
          new Zoom({ className: "ol-zoom-in" }, { className: "ol-zoom-out" }),
        ],
        center: [lon, lat],
        zoom: 10,
        projection: "EPSG:4326", //need this
      }),
    });
    setMap(initialMap);
  }, [lon, lat]);

  return <div className="map" ref={mapElement} />;
}
