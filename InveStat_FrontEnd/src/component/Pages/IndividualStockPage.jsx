import React, { Component } from "react";
import { getStockHistoricalData } from "../../services/stockDataService";
import StockGraph from "../common/stockgraph";

class IndividualStockPage extends Component {
  state = {
    stockData: {},
  };

  async componentDidMount() {
    const tickerID = this.props.match.params.ticker;
    const stockData = await getStockHistoricalData(tickerID);
    this.setState({ stockData });
  }

  render() {
    const { stockData } = this.state;
    console.log(stockData);
    return (
      <React.Fragment>
        <h1>{this.props.match.params.ticker}</h1>
        <StockGraph stockData={stockData} />
      </React.Fragment>
    );
  }
}

export default IndividualStockPage;
