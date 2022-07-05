import React from "react";
import { useRef, useEffect, useState } from "react";
import puffin from "../img/puffin.png";

export default function Title(darkMode) {
  return (
    <nav>
      {console.log("Dark Mode in Nav is: ", typeof darkMode)}
      <div
        className={`div__title ${
          darkMode.darkMode ? "dark-mode-title" : "light-mode"
        }`}
      >
        <h1 className="h1__title">
          The <span className="h1__span">Purple</span> Puffin
        </h1>
        <img className="img__title" src={puffin} alt="Cartoon puffin" />
      </div>
    </nav>
  );
}
