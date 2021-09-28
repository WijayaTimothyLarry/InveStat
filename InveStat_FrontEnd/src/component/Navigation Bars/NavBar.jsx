import React from "react";
import { Link, NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        InveStat
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
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/main-page">
            Main
          </NavLink>
          <NavLink className="nav-item nav-link" to="/watchlist">
            Watchlist
          </NavLink>
          <NavLink className="nav-item nav-link" to="/goal-setting">
            Goal Setting
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customers">
            Profile
          </NavLink>
        </div>
      </div>
      <Link className="btn btn-primary float-right mr-2" to="/login">
        Login
      </Link>
      <Link className="btn btn-primary float-right" to="/signup">
        Sign Up
      </Link>
    </nav>
  );
};

export default NavBar;
