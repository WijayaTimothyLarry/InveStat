import React, { Component } from "react";
import { getStockHistoricalData } from "../../services/stockDataService";
import StockGraph from "../common/stockgraph";

class IndividualStockPage extends Component {
  state = {
    stockData: [],
  };

  async componentDidMount() {
    const tickerID = this.props.match.params.ticker;
    const data = getStockHistoricalData(tickerID);
    console.log(data);
  }

  render() {
    return (
      <React.Fragment>
        <h1>{this.props.match.params.ticker}</h1>
        <StockGraph />
      </React.Fragment>
    );
  }
}

export default IndividualStockPage;
