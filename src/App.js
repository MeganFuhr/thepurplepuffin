import "./App.css";
import Title from "./components/Title";
import Card from "./components/Card";

function App() {
  return (
    <main>
      <Title />
      <div className="div__content">
        <Card />
      </div>
    </main>
  );
}

export default App;
