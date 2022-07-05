import "./App.css";
import Title from "./components/Title";
import Card from "./components/Card";
// import Search from "./components/Search";
import { useState, useCallback, useRef, useEffect } from "react";
import Loading from "./components/Loading";
import useBirdSearch from "./hooks/useBirdSearch";

function App() {
  const [darkMode, setDarkMode] = useState(false);
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
  const { birds, isLoading, error, hasMore } = useBirdSearch(query);

  const observer = useRef();
  const lastCard = useCallback(
    (node) => {
      const options = {
        rootMargin: "0px",
        threshold: 0.25,
      };
      if (isLoading) return;

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setSkipNum((prev) => prev + limitNum);
        }
      }, options);
      if (observer.current) observer.current.disconnect();
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <>
      <main>
        <Title darkMode={darkMode} />
        {/* <Search /> */}{" "}
        <div className="div__content">
          <button
            className="darkmode-toggle"
            onClick={() => {
              setDarkMode((prev) => !prev);
            }}
          >
            Toggle dark mode
          </button>
          {isLoading && <Loading />}
          {error && "Error"}
          {birds.map((item, index) => {
            if (birds.length === index + 1) {
              return (
                <div
                  className="card__show div__card"
                  ref={lastCard}
                  key={index}
                >
                  <Card darkMode={darkMode} {...item} key={item.sys.id} />
                </div>
              );
            } else {
              return <Card darkMode={darkMode} {...item} key={item.sys.id} />;
            }
          })}
          ;
        </div>
      </main>
    </>
  );
}

export default App;
