// Libraries and Component File Imports
import React, { useState, useReducer, useEffect } from "react";
import InputField from "./InputField";
import ExpenseList from "./ExpenseList";
import Alert from "./Alert";
//import Chart from "./Chart";

// Utility Function Imports
import sumExpenses from "./utility/sumExpenses";
import monthMapper from "./utility/monthMapper";

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "remove":
      return state.filter((item, index) => {
        return index !== action.payload;
      });
    default:
      return state;
  }
};

const addToLocalStorage = (value, date, item, month) => {
  // Fetch old list
  let entries = JSON.parse(localStorage.getItem("Expenses"));
  if (!entries) {
    entries = [];
  }
  entries.push({
    value,
    date,
    item,
    month
  });
  localStorage.setItem("Expenses", JSON.stringify(entries));
};

const submitHandler = (
  e,
  dispatchExpenses,
  expenseHook,
  dateHook,
  itemHook,
  today
) => {
  e.preventDefault();
  const month = monthMapper(parseInt(dateHook[0].split("-")[1]));
  dispatchExpenses({
    type: "add",
    payload: {
      value: +expenseHook[0],
      date: dateHook[0],
      item: itemHook[0],
      month: month
    }
  });
  addToLocalStorage(+expenseHook[0], dateHook[0], itemHook[0], month);
  // Reset form fields
  const [expense, setExpense] = expenseHook; //eslint-disable-line
  const [date, setDate] = dateHook; //eslint-disable-line
  const [item, setItem] = itemHook; //eslint-disable-line
  setExpense(1);
  setDate(today);
  setItem("");
};

const AddExpense = ({ today }) => {
  // Item Hook
  const itemHook = useState("");
  // Expense Hook
  const expenseHook = useState(1);
  // Date Hook
  const dateHook = useState(today);
  // All expenses hook
  const initialState = [];
  const [expenses, dispatchExpenses] = useReducer(reducer, initialState);

  // Load all data from localStorage (only once)
  useEffect(() => {
    // For each expense call dispatch and add to array
    const localExpenses = JSON.parse(localStorage.getItem("Expenses"));
    if (localExpenses) {
      localExpenses.forEach(exp => {
        dispatchExpenses({
          type: "add",
          payload: exp
        });
      });
    }
  }, []);

  return (
    <div style={{ marginBottom: "50px" }} className="container text-center">
      <h4>Add a new Expense</h4>
      <form
        onSubmit={e =>
          submitHandler(
            e,
            dispatchExpenses,
            expenseHook,
            dateHook,
            itemHook,
            today
          )
        }
      >
        <InputField
          hook={expenseHook}
          label="Value in Rupees"
          type="number"
          labelFor="expense-val"
        />
        <InputField
          hook={dateHook}
          label="Date"
          type="date"
          labelFor="expense-date"
        />
        <InputField
          hook={itemHook}
          label="Item/Purpose"
          type="text"
          labelFor="expense-item"
        />
        <button className="btn btn-primary">Add (+)</button>
      </form>
      <Alert val={sumExpenses(expenses)} />
      <ExpenseList dispatch={dispatchExpenses} expenses={expenses} />
    </div>
  );
};

export default AddExpense;
