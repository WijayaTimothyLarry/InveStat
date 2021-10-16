import React, { Component } from "react";
import http from "../../services/httpService";
import stockData from "../../US Ticker List/stockTest.json";
import { getData } from "./../../services/stockDataService";
class IndividualStockPage extends Component {
  state = {
    stockData: stockData,
  };

  componentDidMount() {
    const data = getData();
    console.log(data);
  }

  render() {
    return <div> test </div>;
  }
}

export default IndividualStockPage;
