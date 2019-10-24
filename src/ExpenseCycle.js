import React, { useState } from "react";
import InputField from "./InputField";

/* The expense cycle component maintains two pieces of information in its state:
 *  a) The start date of the income cycle
 *  b) The end date of the income cycle
 */
const ExpenseCycle = ({ today }) => {
  const startHook = useState(today);
  const endHook = useState(today);

  return (
    <div style={{ marginBottom: "50px" }} className="container text-center">
      <form
        onSubmit={e => {
          e.preventDefault();
          // Add billing cycle details to localStorage
          localStorage.setItem("cycleStart", startHook[0]);
          localStorage.setItem("cycleEnd", endHook[0]);
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
    </div>
  );
};

export default ExpenseCycle;
