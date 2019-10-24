import React, { useState } from "react";
import InputField from "./InputField";
import Alert from "./Alert";
import sumExpenses from "./utility/sumExpenses";

const checkInRange = (date, from, to) => {
  const check = new Date(date);
  const nfrom = new Date(from);
  const nto = new Date(to);

  return check >= nfrom && check <= nto;
};

const computeData = (start, end) => {
  // Filter expenses based on range
  const expenses = JSON.parse(localStorage.getItem("Expenses"));
  if (expenses && expenses.length) {
    const filtered = expenses.filter(expense => {
      return checkInRange(expense.date, start, end);
    });
    return sumExpenses(filtered);
  }
  return 0;
};

/* The expense cycle component maintains two pieces of information in its state:
 *  a) The start date of the income cycle
 *  b) The end date of the income cycle
 */
const ExpenseCycle = ({ today }) => {
  const startHook = useState(today);
  const endHook = useState(today);
  const [isCalculated, setIsCalculated] = useState(0);
  return (
    <div style={{ marginBottom: "50px" }} className="container text-center">
      <form
        onSubmit={e => {
          e.preventDefault();
          const start = new Date(startHook[0]);
          const end = new Date(endHook[0]);
          setIsCalculated(computeData(start, end));
        }}
      >
        <h4>Set Expense Cycle</h4>
        <InputField
          label="Start Date"
          labelFor="cycle-start"
          type="date"
          hook={startHook}
        />
        <InputField
          label="End Date"
          labelFor="cycle-end"
          type="date"
          hook={endHook}
        />
        <button className="btn btn-primary">Compute for cycle</button>
        <br></br>
        <small>
          Clicking on this button will give you the amount of money spent during
          the selected period
        </small>
      </form>
      {isCalculated ? (
        <div style={{ marginTop: "35px" }}>
          <p>{`Expense data from ${startHook[0]} to ${endHook[0]}`}</p>
          <Alert val={isCalculated} />
        </div>
      ) : null}
    </div>
  );
};

export default ExpenseCycle;
