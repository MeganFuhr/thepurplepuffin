import React, { useState } from "react";
import ReactDom from "react-dom";
import Loading from "./Loading";

export default function ImageModal({
  open,
  onClose,
  imgUrl,
  name,
  description,
  darkMode,
  setIsOpen,
}) {
  const [loaded, setLoaded] = useState(false);

  if (!open) return null;
  return ReactDom.createPortal(
    <div className="modal__overlay" onClick={() => setIsOpen(false)}>
      <div
        className={`div__image-modal ${darkMode ? "dark-mode" : "light-mode"}`}
      >
        <img
          src={`${imgUrl}`}
          alt={description}
          onLoad={() => setLoaded(true)}
        />

        {!loaded && (
          <div className="modal__loading">
            <Loading />
          </div>
        )}
        <div className="div__image-modal-button-container">
          {name}
          <button className="button__image-modal" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
