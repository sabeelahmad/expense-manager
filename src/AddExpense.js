// Libraries and Component File Imports
import React, { useState, useReducer } from "react";
import InputField from "./InputField";
import ExpenseList from "./ExpenseList";

// Utility Function Imports
import sumExpenses from "./utility/sumExpenses";
import Alert from "./Alert";

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    default:
      return state;
  }
};

const AddExpense = () => {
  // Item Hook
  const itemHook = useState("");
  // Expense Hook
  const expenseHook = useState(1);
  // Date Hook
  const dateHook = useState("2001-01-01");
  // All expenses hook
  const initialState = [];
  const [expenses, dispatchExpenses] = useReducer(reducer, initialState);

  return (
    <div style={{ marginBottom: "50px" }} className="container text-center">
      <h4 style={{ fontWeight: "lighter" }}>Add a new Expense</h4>
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatchExpenses({
            type: "add",
            payload: {
              value: +expenseHook[0],
              date: dateHook[0],
              item: itemHook[0]
            }
          });
        }}
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
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default AddExpense;
