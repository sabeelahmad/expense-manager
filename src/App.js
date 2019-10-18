import React from "react";
import { render } from "react-dom";
import Hero from "./Hero";
import AddExpense from "./AddExpense";

const App = () => {
  return (
    <div className="App">
      <Hero />
      <AddExpense />
    </div>
  );
};

render(<App />, document.getElementById("root"));
