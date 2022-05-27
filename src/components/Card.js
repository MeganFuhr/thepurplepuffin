import React from "react";

export default function Card(props) {
  return (
    <div className="div__card">
      <div className="div__card_content">
        <img
          className="img__card"
          src={`${props.image.url}?fm=avif&q=50&w=200&h=200`}
          alt={props.description}
        ></img>
      </div>
      <div className="div__card_content_text">
        <h1 className="h1__card_title">{props.name}</h1>
        <p className="p__card_desription">{props.description}</p>
        <p className="p__card_lonlat">
          Lon: {props.location.lon} &nbsp; &nbsp; {props.location.lat}
        </p>
        <div>THIS IS WHERE I WILL PUT GOOGLE API.</div>
      </div>
    </div>
  );
}
