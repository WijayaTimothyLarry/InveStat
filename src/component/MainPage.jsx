import React, { Component } from "react";
import NavBar from "./Navigation Bars/NavBar";
import PortfolioTable from "./PortfolioTable";

class MainPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <h1>Welcome Back User</h1>

          <PortfolioTable />
        </main>
      </React.Fragment>
    );
  }
}

export default MainPage;
