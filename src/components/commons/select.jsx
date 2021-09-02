import React from "react";
import Select from "react-select";

const SelectMultiple = props => {
  const { options, onChange, placeholder } = props;
  return (
    <Select
      placeholder={placeholder}
      isMulti
      cacheOptions
      defaultOptions
      options={options}
      onChange={onChange}
    />
  );
};

export default SelectMultiple;
