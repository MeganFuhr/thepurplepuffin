import "./App.css";
import Title from "./components/Title";
import Card from "./components/Card";
import Search from "./components/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./components/Loading";

function App() {
  const [birds, setBirds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const birdContent = () => {
    return (
      <>
        {birds.items.map((item) => {
          return <Card key={item.sys.id} {...item} />;
        })}
      </>
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

  const cards = document.querySelectorAll(".div__card");

  const options = {
    rootMargin: "0px",
    threshold: 1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("card__show", entry.isIntersecting);
    });
  }, options);

  cards.forEach((card) => {
    observer.observe(card);
    console.log(card);
  });

  return (
    <>
      <main>
        <Title />
        <Search />
        <div className="div__content">
          {isLoading ? (
            <div className="div__loading">
              <Loading />
            </div>
          ) : (
            birdContent()
          )}
        </div>
      </main>
    </>
  );
}

export default App;
