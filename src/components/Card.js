import React, { useState, useRef, useEffect } from "react";
import GetMap from "./GetMap";
import ImageModal from "./ImageModal";

const Card = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSeen, setIsSeen] = useState(false);

  const cardRef = useRef();
  const options = {
    rootMargin: "0px",
    threshold: 0.25,
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (isSeen && !entry.isIntersecting) {
          entry.target.classList.remove("card__show");
        } else {
          entry.target.classList.add("card__show");
          observer.unobserve(cardRef.current);
          setIsSeen(true);
        }
      });
    }, options);

    observer.observe(cardRef.current);
  });

  return (
    <div ref={cardRef} className="div__card">
      <div className="div__card_content">
        <img
          className="img__card"
          src={`${props.image.url}?f=center&w=200&h=200&fm=avif&q=50&fit=scale`}
          alt={props.description}
          onClick={() => setIsOpen(true)}
        />

        <ImageModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          imgUrl={`${props.image.url}?w=650&h=550&fit=scale`}
          name={props.name}
          description={props.description}
        />
      </div>

      <div className="div__card_content_text">
        <h1 className="h1__card_title">{props.name}</h1>
        <p className="p__card_desription">{props.description}</p>
        <p className="p__card_lonlat">
          Lon: {props.location.lon} &nbsp; &nbsp; {props.location.lat}
        </p>
        {GetMap(props.location.lon, props.location.lat)}
      </div>
    </div>
  );
};

export default Card;
