import React from "react";

const CheckBox = ({ label, name, value, onChange }) => {
  return (
    <div className="form-group">
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          value={value}
          onChange={onChange}
          id={name}
          name={name}
          checked={value}
        />
        <label className="custom-control-label" htmlFor={name}>
          {label}
        </label>
      </div>
    </div>
  );
};

export default CheckBox;
