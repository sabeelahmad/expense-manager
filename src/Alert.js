import React from "react";

const Alert = ({ val }) => {
  return (
    <div
      style={{ marginTop: "25px" }}
      className="alert alert-primary"
      role="alert"
    >
      Your total expenses are equal to &#x20B9; {val}
    </div>
  );
};

export default Alert;
