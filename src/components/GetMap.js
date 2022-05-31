import React, { useState, useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
// import Style from "ol/style/Style";
// import Icon from "ol/style/Icon";

// const star = "../../public/star.png";
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
        }),
      ],
      view: new View({
        center: [lon, lat],
        zoom: 10,
        projection: "EPSG:4326", //need this
      }),
    });
    setMap(initialMap);
  }, [lon, lat]);

  return <div className="map" ref={mapElement} />;
}
