import "./App.css";
import Title from "./components/Title";
import Card from "./components/Card";
import Search from "./components/Search";

function App() {
  return (
    <main>
      <Title />
      <Search />
      <div className="div__content">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </main>
  );
}

export default App;
