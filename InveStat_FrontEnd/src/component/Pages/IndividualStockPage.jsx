import React, { Component } from "react";
import http from "../../services/httpService";
import stockData from "../../US Ticker List/stockTest.json";
class IndividualStockPage extends Component {
  state = {
    stockData: stockData,
  };

  data;
  render() {
    console.log(this.state.stockData);
    return <div> test </div>;
  }
}

export default IndividualStockPage;
