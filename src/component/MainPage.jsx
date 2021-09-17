import React, { Component } from "react";
import BarMenu from "./BarMenu";
import PortfolioTable from "./PortfolioTable";

class MainPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BarMenu />
        <main className="container">
          <h1>Welcome Back User</h1>
          <canvas id="lineChart"></canvas>
          <PortfolioTable />
        </main>
      </React.Fragment>
    );
  }
}

export default MainPage;
