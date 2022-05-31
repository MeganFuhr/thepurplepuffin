import React, { useState } from "react";
import GetMap from "./GetMap";

export default function Card(props) {
  const [isFetchingMap, setIsFetchingMap] = useState(false);

  return (
    <div className="div__card">
      <div className="div__card_content">
        <img
          className="img__card"
          src={`${props.image.url}?f=center&w=200&h=200&fm=avif&q=50&fit=scale`}
          alt={props.description}
        ></img>
      </div>
      <div className="div__card_content_text">
        <h1 className="h1__card_title">{props.name}</h1>
        <p className="p__card_desription">{props.description}</p>
        <p className="p__card_lonlat">
          Lon: {props.location.lon} &nbsp; &nbsp; {props.location.lat}
        </p>
        {isFetchingMap
          ? "loading"
          : GetMap(setIsFetchingMap, props.location.lon, props.location.lat)}
      </div>
    </div>
  );
}
