import React from "react";
import AsyncSelect from "react-select/async";

const SelectMultiple = ({
  name,
  label,
  items,
  onChange,
  error,
  value,
  func
}) => {
  console.log("asd", func);
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <AsyncSelect
        key={value._id}
        className={
          error === "" || error === undefined ? "mb-2" : "mb-2 is-invalid"
        }
        value={value}
        isMulti
        isClearable
        isSearchable
        name={name}
        defaultOptions
        getOptionLabel={skill => skill.name}
        getOptionValue={skill => skill._id}
        cacheOptions
        loadOptions={func}
        onChange={onChange}
      />
      {error && (
        <p>
          <small className="text-danger">{error}</small>
        </p>
      )}
    </div>
  );
};

export default SelectMultiple;
