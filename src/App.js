import "./App.css";
import Title from "./components/Title";
import Card from "./components/Card";
import Search from "./components/Search";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [birds, setBirds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const birdContent = () => {
    return (
      <div className="div__content">
        {birds.items.map((item) => {
          return <Card key={item.sys.id} {...item} />;
        })}
      </div>
    );
  };

  useEffect(() => {
    const headers = {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_API}`,
    };

    const query = `query {
    birdCollection {
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
    }
    `;

    axios({
      url: process.env.REACT_APP_CONTENTFUL_GRAPH_URL,
      method: "post",
      headers: headers,
      data: { query },
    })
      .then((response) => {
        setBirds(response.data.data.birdCollection);
        setIsLoading(false);
      })
      .catch((err) => console.log(`dafuq ${err}`));
  }, []);

  return (
    <main>
      <Title />
      <Search />
      {
        isLoading ? "loading..." : birdContent()
        // <div className="div__content">
        //   {birds.items.map((item) => {
        //     return <Card key={item.sys.id} {...item} />;
        //   })}
        // </div>
      }
    </main>
  );
}

export default App;
