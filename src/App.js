import React from "react";
import { render } from "react-dom";
import Hero from "./Hero";
import AddExpense from "./AddExpense";
import ExpenseCycle from "./ExpenseCycle";
import Chart from "./Chart";

const getTodayDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
};

const App = () => {
  return (
    <div className="App">
      <Hero />
      <ExpenseCycle today={getTodayDate()} />
      <AddExpense today={getTodayDate()} />
      <Chart />
    </div>
  );
};

render(<App />, document.getElementById("root"));
