import React from "react";

export default function Card() {
  return (
    <div className="div__card">
      <div className="div__card_content">
        <img
          className="img__card"
          src="https://images.ctfassets.net/fk18omwn255s/5gCEadCWcBhd21aCrLbDDU/9a483fc8652a6ae52b971c070736a880/tuftedTitmouse.jpg?fm=avif&q=50&w=200&h=200"
          alt="This is a bird."
        ></img>
      </div>
      <div className="div__card_content_text">
        <h1 className="h1__card_title">TUFTED TITMOUSE</h1>
        <p className="p__card_desription">
          Slate gray bird with white chest and belly. Pointed crest.
        </p>
        <p className="p__card_lonlat">
          Lon: 70.3711 &nbsp; &nbsp; Lat: 43.67702
        </p>
        <div>THIS IS WHERE I WILL PUT GOOGLE API.</div>
      </div>
    </div>
  );
}
