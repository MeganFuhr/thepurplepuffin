import "./App.css";
import Title from "./components/Title";
import Card from "./components/Card";
import Search from "./components/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import UseBirdSearch from "./UseBirdSearch";

function App() {
  const { birds, isLoading } = UseBirdSearch(`query {
  birdCollection(skip:0 limit:3) {
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
}`);

  const DisplayBirdContent = () => {
    return (
      <>
        {birds[0].items.map((item) => {
          return <Card key={item.sys.id} {...item} />;
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
