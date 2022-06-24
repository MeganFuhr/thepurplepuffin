import "./App.css";
import Title from "./components/Title";
import Card from "./components/Card";
import Search from "./components/Search";
import { useEffect, useState, useCallback, useRef } from "react";
import Loading from "./components/Loading";
import useBirdSearch from "./useBirdSearch";
import getBirds from "./getBirds";

function App() {
  var count = useRef(0);
  const [skipNum, setSkipNum] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [appBirds, setAppBirds] = useState();
  const cardDisplay = [];
  const [cardCollection, setCardCollection] = useState([]);
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

  const { birds, isLoading, total } = getBirds(query);
  const options = {
    rootMargin: "0px",
    threshold: 1,
  };

  const observer = useRef();
  const lastCard = useCallback(
    (node) => {
      count = count + 1;
      console.log("Ref Count: ", count);

      if (isLoading) return;

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("visible");
          setSkipNum((prev) => prev + parseInt(limitNum));
          return;
        }
      }, options);
      if (observer.current) observer.current.disconnect();
      if (node) observer.current.observe(node);
      console.log("in lastCard", node);
    },
    [isLoading]
  );

  const DisplayBirdContent = () => {
    let content = document.getElementsByClassName("div__content");
    console.log(content);
    console.log("App.js Total: ", total.current);

    return (
      <>
        {birds.items.map((item, index) => {
          // console.log("Bird: ", item);
          // console.log("Birds length: ", birds.items.length);
          if (birds.items.length === index + 1) {
            console.log("Last bird!!!", item, index);

            cardDisplay.push(
              <div className="card__show div__card" ref={lastCard} key={index}>
                <Card key={item.sys.id} {...item} />
              </div>
            );
            return cardDisplay;
          } else {
            cardDisplay.push(<Card key={item.sys.id} {...item} />);
            return cardDisplay;
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
            cardDisplay && DisplayBirdContent()
          )}
        </div>
      </main>
    </>
  );
}

export default App;
