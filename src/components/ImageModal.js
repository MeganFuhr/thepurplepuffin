import React from "react";
import ReactDom from "react-dom";

export default function ImageModal({ open, onClose, imgUrl, description }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <div className="modal__overlay">
      <div className="div_image-modal">
        <button onClick={onClose}>Close</button>
        <img src={`${imgUrl}`} alt={description} />
      </div>
    </div>,
    document.getElementById("portal")
  );
}
