import React from "react";

const InputField = ({ label, labelFor, type, hook }) => {
  const [state, setState] = hook;

  return (
    <div className="form-group">
      <label htmlFor={labelFor}>
        {label}
        <input
          onChange={e => setState(e.target.value)}
          id={labelFor}
          type={type}
          value={state}
          className="form-control"
          placeholder="Enter Details"
          required
        ></input>
      </label>
    </div>
  );
};

export default InputField;
