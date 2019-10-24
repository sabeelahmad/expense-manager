import React from "react";

const removeFromLocalStorage = payload => {
  let entries = JSON.parse(localStorage.getItem("Expenses"));
  if (!entries) {
    entries = [];
  }
  entries = entries.filter((item, index) => {
    return index !== payload;
  });
  localStorage.setItem("Expenses", JSON.stringify(entries));
};

const ExpenseList = ({ expenses, dispatch }) => {
  return (
    <div style={{ marginTop: "50px" }}>
      <h4>Your Expenses</h4>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <span className="badge badge-primary badge-pill">
            Expense in &#x20B9;
          </span>
          <span className="badge badge-primary badge-pill">Date</span>
          <span className="badge badge-danger badge-pill">Remove</span>
        </li>
        {expenses.map((expense, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <p style={{ textAlign: "left" }}>
              &#x20B9; {expense.value}
              <br />
              <small>{expense.item}</small>
            </p>
            <span className="badge badge-primary badge-pill">
              {expense.date}
            </span>
            <button
              data-index={index}
              onClick={e => {
                dispatch({
                  type: "remove",
                  payload: +e.target.dataset.index
                });
                removeFromLocalStorage(+e.target.dataset.index);
              }}
              className="badge badge-danger badge-pill"
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
