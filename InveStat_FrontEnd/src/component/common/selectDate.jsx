import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelect = ({ name, label, error, ...rest }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <DatePicker
        {...rest}
        name={name}
        id={name}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default DateSelect;
