import React, { Component } from "react";
import StockGraph from "../common/stockgraph";
import stockDataService from "./../../services/stockDataService";

class IndividualStockPage extends Component {
  state = {
    stockData: [],
  };

  //async componentDidMount() {
  //  
  //  const tickerID = this.props.match.params.ticker;
  //  const { data } = await stockDataService.getDailyStockData(tickerID);
  //  const dailyData = data["Time Series (Daily)"];
  //  const stockData = Object.entries(dailyData).map(([k, v]) => {
  //    return { date: k, price: v["5. adjusted close"] };
  //  });
  //  console.log(stockData);
  //  this.setState({ stockData });
  //}

  render() {
    return (
      <React.Fragment>
        <h1>{this.props.match.params.ticker}</h1>
        <StockGraph/>
      </React.Fragment>
    );
  }
}

export default IndividualStockPage;
