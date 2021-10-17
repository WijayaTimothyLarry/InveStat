import React, { Component } from "react";
import http from "../../services/httpService";
import stockData from "../../US Ticker List/stockTest.json";
import { getData } from "./../../services/stockDataService";
class IndividualStockPage extends Component {
  state = {
    stockData: stockData,
  };

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <h1>{this.props.match.params.ticker}</h1>
      </React.Fragment>
    );
  }
}

export default IndividualStockPage;
