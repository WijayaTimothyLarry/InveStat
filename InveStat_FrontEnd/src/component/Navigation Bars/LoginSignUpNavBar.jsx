import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo/InveStatLogo3.png";
import "../../css/NavBarLogo.css";
const NotLoggedInNavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <img className="logo" src={logo} width="53" height="30" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup"></div>
      <Link className="btn btn-primary float-right mr-2" to="/login">
        Login
      </Link>
      <Link className="btn btn-primary float-right" to="/signup">
        Sign Up
      </Link>
    </nav>
  );
};

export default NotLoggedInNavBar;
