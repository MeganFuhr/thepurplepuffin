import "./App.css";
import Title from "./components/Title";
import Card from "./components/Card";
import Search from "./components/Search";
import { useEffect, useState, useCallback, useRef } from "react";
import Loading from "./components/Loading";
import UseBirdSearch from "./UseBirdSearch";

function App() {
  const [skipNum, setSkipNum] = useState(0);
  const limitNum = 4;
  const query = `query {
  birdCollection(skip:${skipNum} limit:4) {
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

  const { birds, isLoading } = UseBirdSearch(query);
  const observer = useRef();
  const lastCard = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("visible");
          // UseBirdSearch(query);
        }
      });
      if (node) observer.current.observe(node);
      console.log("in lastCard", node);
    },
    [isLoading]
  );

  const DisplayBirdContent = () => {
    return (
      <>
        {birds[0].items.map((item, index) => {
          console.log("Bird: ", item);
          console.log("Birds length: ", birds[0].items.length);
          if (birds[0].items.length === index + 1) {
            console.log("Last bird!!!", item, index);
            return (
              <div className="div__card card__show" ref={lastCard} key={index}>
                <Card key={item.sys.id} {...item} />
              </div>
            );
          } else {
            return <Card key={item.sys.id} {...item} />;
          }
        })}
      </>
    );
  };

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
            DisplayBirdContent()
          )}
        </div>
      </main>
    </>
  );
}

export default App;
