import React, { useState } from "react";
import ReactDom from "react-dom";
import Loading from "./Loading";

export default function ImageModal({
  open,
  onClose,
  imgUrl,
  name,
  description,
}) {
  const [loaded, setLoaded] = useState(false);

  if (!open) return null;
  return ReactDom.createPortal(
    <div className="modal__overlay">
      <div className="div__image-modal">
        <img
          src={`${imgUrl}`}
          alt={description}
          onLoad={() => setLoaded(true)}
        />

        {!loaded && (
          <div className="div__loading">
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
