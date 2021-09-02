import React, { Component } from "react";
import Input from "./input";
import Select from "./selectbox";
import Joi from "joi-browser";
import TextArea from "./textArea";
import CheckBox from "./checkBox";
import SelectMultiple from "./selectMultiple";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let errorMessage of error.details) {
      errors[errorMessage.path[0]] = errorMessage.message;
    }

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  validateSelectProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  validateSelectMultipleProperty = (name, value) => {
    const data = value ? value : [];
    const obj = { [name]: data };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  handleCheckBoxChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value === "true" ? false : true;
    this.setState({ data, errors });
  };

  handleSelectChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateSelectProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleTextAreaChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleChangeMultiple = (selectedOptions, { name }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateSelectMultipleProperty(
      name,
      selectedOptions
    );
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];
    let array = [];
    //Set array data
    if (selectedOptions) {
      array = selectedOptions;
      // .map(selectedOption => ({
      //   value: selectedOption._id,
      //   label: selectedOption.name
      // }));
    }
    let data = { ...this.state.data };
    data[name] = array;
    this.setState({ data, errors });
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.onSubmit();
  };

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        className="btn btn-primary btn-sm mb-3"
      >
        <i className="fa fa-dot-circle-o" /> {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        name={name}
        error={errors[name]}
        type={type}
      />
    );
  }
  renderSelectMultiple(name, label, func) {
    const { data, errors } = this.state;
    console.log("func", func);

    return (
      <SelectMultiple
        //loadOptions={items}
        value={data[name]}
        label={label}
        error={errors[name]}
        name={name}
        onChange={this.handleChangeMultiple}
        func={func}
      />
    );
  }
  renderCheckBox(name, label) {
    const { data, errors } = this.state;
    return (
      <CheckBox
        value={data[name]}
        label={label}
        onChange={this.handleCheckBoxChange}
        name={name}
        errors={errors}
      />
    );
  }

  renderTextArea(name, label, rows = "3") {
    const { data, errors } = this.state;
    return (
      <TextArea
        value={data[name]}
        label={label}
        rows={rows}
        onChange={this.handleChange}
        name={name}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, items) {
    const { data, errors } = this.state;
    return (
      <Select
        items={items}
        value={data[name]}
        label={label}
        error={errors[name]}
        name={name}
        onChange={this.handleSelectChange}
      />
    );
  }
}

export default Form;
