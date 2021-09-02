import React from "react";

const Select = ({ items, label, name, error, value, onChange }) => {
  const select = [{ key: "0", name: "---- Choose an option ----" }, ...items];
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        className={
          error === "" || error === undefined
            ? "form-control"
            : "form-control is-invalid"
        }
        id={name}
        name={name}
        onChange={onChange}
        value={value}
      >
        {select.map(item => (
          <option key={item._id || item.key} value={item._id || item.key}>
            {item.name}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Select;
