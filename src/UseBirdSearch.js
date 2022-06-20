import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";
import React from "react";

export default function UseBirdSearch(query) {
  const [birds, setBirds] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

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
        setBirds([...birds, response.data.data.birdCollection]);
        setIsLoading(false);
        console.log("Calling UseBirdSearch");
      })
      .catch((err) =>
        console.log(`dafuq in useBirdSearch ${err} birds are${birds}`)
      );
  }, [query]);
  return { birds, isLoading };
}
