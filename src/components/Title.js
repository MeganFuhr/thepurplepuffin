import React from "react";
import puffin from "../img/puffin.png";
import puffinsm from "../img/puffin-small.png";

export default function Title(darkMode) {
  return (
    <nav>
      <div
        className={`div__title ${
          darkMode.darkMode ? "dark-mode-title" : "light-mode"
        }`}
      >
        <h1 className="h1__title">
          The <span className="h1__span">Purple</span> Puffin
        </h1>
        <img className="img__title" src={puffinsm} alt="Cartoon puffin" />
      </div>
    </nav>
  );
}
