import React from "react";
const TextArea = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        {...rest}
        id={name}
        name={name}
        className={
          error === "" || error === undefined
            ? "form-control"
            : "form-control is-invalid"
        }
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default TextArea;
