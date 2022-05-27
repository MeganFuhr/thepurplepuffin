import "./App.css";
import Title from "./components/Title";
import Card from "./components/Card";
import Search from "./components/Search";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [birds, setBirds] = useState([]);

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
    }).then((response) => {
      // console.log(response.data.data.birdCollection.items);
      setBirds(response.data.data.birdCollection);
    });
  }, []);

  return (
    <main>
      <Title />
      <Search />
      <div className="div__content">
        {birds.items.map((item) => {
          // return console.log(item);
          return <Card key={item.sys.id} {...item} />;
        })}
      </div>
    </main>
  );
}

export default App;
