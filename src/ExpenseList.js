import React from "react";

const ExpenseList = ({ expenses }) => {
  return (
    <div style={{ marginTop: "50px" }}>
      <h4 style={{ fontWeight: "lighter" }}>Your Expenses</h4>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Expense in &#x20B9;
          <span className="badge badge-primary badge-pill">yyyy-mm-dd</span>
        </li>
        {expenses.map((expense, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            &#x20B9; {expense.value}, {expense.item}
            <span className="badge badge-primary badge-pill">
              {expense.date}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
