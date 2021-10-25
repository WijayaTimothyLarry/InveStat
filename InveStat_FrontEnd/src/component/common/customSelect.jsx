import React from "react";
import Select from "react-select";

const CustomSelect = ({ name, label, options, error, onChange, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Select options={options} onChange={onChange} {...rest} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default CustomSelect;
