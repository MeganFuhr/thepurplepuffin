import { useEffect, useState } from "react";
import axios from "axios";

export default function useBirdSearch(query) {
  const [birds, setBirds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    let cancel;
    const headers = {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_API}`,
    };

    axios({
      url: process.env.REACT_APP_CONTENTFUL_GRAPH_URL,
      method: "post",
      headers: headers,
      data: { query },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        setBirds((prevBirds) => {
          return [...prevBirds, ...response.data.data.birdCollection.items];
        });
        setHasMore(birds.length < response.data.data.birdCollection.total);
        setIsLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(true);
        console.log(
          `dafuq in useBirdSearch ${err} birds are${JSON.stringify(birds)}`
        );
      });
    return () => cancel();
  }, [query]);
  return { birds, isLoading, error, hasMore };
}
