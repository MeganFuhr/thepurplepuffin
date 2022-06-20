import "./App.css";
import Title from "./components/Title";
import Card from "./components/Card";
import Search from "./components/Search";
import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import UseBirdSearch from "./UseBirdSearch";

function App() {
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

  const lastCard = () => {
    console.log("in lastCard");
    // setSkipNum((prev) => prev + limitNum);
    // UseBirdSearch(query);
  };

  const { birds, isLoading } = UseBirdSearch(query);

  const DisplayBirdContent = () => {
    return (
      <>
        {birds[0].items.map((item, index) => {
          console.log(item);
          if (birds[0].items.length === index - 1) {
            lastCard();
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
