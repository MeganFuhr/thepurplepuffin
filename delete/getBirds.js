import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Card from "../src/components/Card";
import React from "react";

export default function useBirdSearch(query) {
  const [birds, setBirds] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const total = useRef("");

  useEffect(() => {
    const headers = {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_API}`,
    };

    axios({
      url: process.env.REACT_APP_CONTENTFUL_GRAPH_URL,
      method: "post",
      headers: headers,
      data: { query },
    })
      .then((response) => {
        setBirds((prevBirds) => ({
          ...prevBirds,
          ...response.data.data.birdCollection,
        }));
        setIsLoading(false);
        total.current = response.data.data.birdCollection.total;
      })
      .catch((err) =>
        console.log(
          `dafuq in useBirdSearch ${err} birds are${JSON.stringify(birds)}`
        )
      );
  }, [query]);
  return { birds, isLoading, total };
}
