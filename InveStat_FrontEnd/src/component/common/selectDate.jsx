import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 

const DateSelect = ({ name, label, error, ...rest }) => {
  return (
    <div>
      {/* <label For={name} id = {name+"_label"}>{label}</label> */}
      <DatePicker {...rest} wrapperClassName="datePicker" name={name} id={name} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default DateSelect;
