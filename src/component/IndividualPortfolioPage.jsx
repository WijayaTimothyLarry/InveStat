import React, { Component } from "react";
import NavBar from "./Navigation Bars/NavBar";
import StockTable from "./StockTable";
class IndividualPortfolioPage extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <h1>Portfolio 1</h1>

          <StockTable />
        </main>
      </React.Fragment>
    );
  }
}

export default IndividualPortfolioPage;
