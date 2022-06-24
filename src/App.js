import "./App.css";
import Title from "./components/Title";
import Card from "./components/Card";
import Search from "./components/Search";
import { useEffect, useState, useCallback, useRef } from "react";
import Loading from "./components/Loading";
import useBirdSearch from "./useBirdSearch";
// import getBirds from "../delete/getBirds";

function App() {
  var count = useRef(0);
  const [skipNum, setSkipNum] = useState(0);
  const limitNum = 4;
  const query = `query {
  birdCollection(skip:${skipNum} limit:${limitNum}) {
	total
    items {
      sys {
        id
      }
      name
      description
      image {
        title
        description
        url
      }
      location {
        lat
        lon
      }
    }
  }
}`;
  const { birds, isLoading, total, error, hasMore } = useBirdSearch(
    query,
    skipNum
  );

  const options = {
    rootMargin: "0px",
    threshold: 1,
  };

  const observer = useRef();
  const lastCard = useCallback(
    (node) => {
      count = count + parseInt(1);
      console.log("Ref Count: ", count);

      if (isLoading) return;

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("visible");
          setSkipNum((prev) => prev + limitNum);
          console.log("Query is: ", query);
        }
      }, options);
      if (observer.current) observer.current.disconnect();
      if (node) observer.current.observe(node);
      console.log("in lastCard", node);
    },
    [isLoading, hasMore]
  );

  return (
    <>
      <main>
        <Title />
        <Search />
        <div className="div__content">
          {console.log("App.js Birds: ", birds, "IsLoading is: ", isLoading)}
          {isLoading ? (
            <div className="div__loading">
              <Loading />
            </div>
          ) : (
            birds[0].items.map((item, index) => {
              // console.log("Bird: ", item);
              // console.log("Birds length: ", birds.items.length);
              if (birds[0].items.length === index + 1) {
                console.log("Last bird!!!", item, index);
                return (
                  <div
                    className="card__show div__card"
                    ref={lastCard}
                    key={index}
                  >
                    <Card key={item.sys.id} {...item} />
                  </div>
                );
              } else {
                return <Card key={item.sys.id} {...item} />;
              }
            })
          )}
        </div>
      </main>
    </>
  );
}

export default App;
