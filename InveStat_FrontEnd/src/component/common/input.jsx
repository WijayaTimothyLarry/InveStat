import React from "react";
import "../../css/LoginPage.css";

const Input = ({ name, label, id,error,style, ...rest }) => {
  return (
    <div className="form-group">
      {/* <label htmlFor={name} for={name}>{label}</label> */}
      <label for={name}>{label}</label>

      <input {...rest} name={name} id={name} className="form-control" style={style} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
