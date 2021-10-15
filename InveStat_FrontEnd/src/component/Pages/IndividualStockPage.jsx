import React, { Component } from "react";
import http from "../../services/httpService";

class IndividualStockPage extends React.Component {
  state = {
    stockData: [],
  };

  async componentDidMount() {
    // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
    var url =
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=X215NLEHVTCEFB7E";
    const res = http.get(url);
    console.log(res);
  }

  render() {
    return <div>test</div>;
  }
}

export default IndividualStockPage;
