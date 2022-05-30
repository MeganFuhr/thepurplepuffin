import React, { useState, useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";

//https://taylor.callsen.me/using-openlayers-with-react-functional-components/
export default function GetMap(setIsFetchingMap, lon, lat) {
  const [map, setMap] = useState();
  const mapElement = useRef();
  const mapRef = useRef();
  mapRef.current = map;

  var center = [lon, lat];
  console.log(center);

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
                geometry: new Point(fromLonLat([lon, lat])),
              }),
            ],
          }),
        }),
      ],
      view: new View({
        // center: fromLonLat([-70.3547, 43.74369]), //this isn't working with vars
        center: [lon, lat],
        zoom: 10,
        projection: "EPSG:4326", //need this
      }),
    });
    setMap(initialMap);
  }, [setIsFetchingMap, lon, lat]);

  return <div style={{ height: "75px", width: "400px" }} ref={mapElement} />;
}
