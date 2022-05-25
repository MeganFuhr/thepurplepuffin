import React from "react";

export default function Card() {
  return (
    <div className="div__card">
      <div className="div__card_content">
        <img
          className="img__card"
          src="https://images.ctfassets.net/fk18omwn255s/5gCEadCWcBhd21aCrLbDDU/9a483fc8652a6ae52b971c070736a880/tuftedTitmouse.jpg"
          alt="This is a bird."
        ></img>
      </div>
      <div className="div__card_content_text">
        <h1>TUFTED TITMOUSE</h1>
        <p>Slate gray bird with white chest and belly. Pointed crest.</p>
        <div>THIS IS WHER I WILL PUT GOOGLE API.</div>
      </div>
    </div>
  );
}
