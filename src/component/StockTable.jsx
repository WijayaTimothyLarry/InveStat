import React, { Component } from "react";
import { getStockList } from "../controller class/PortfolioPageController";

class StockTable extends Component {
  state = {
    stockList: getStockList(),
  };
  render() {
    const numberOfStocks = this.state.stockList.length;
    if (numberOfStocks === 0)
      return (
        <React.Fragment>
          {" "}
          <p>Your Stocks:</p>
          <table className="table">
            <thead>
              <tr>
                <th>Average Price</th>
                <th>Quantity</th>
                <th>Current Value</th>
                <th>Capital Gains</th>
                <th>Dividends</th>
                <th>Currency</th>
                <th>Return</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> You dont have any stocks in this portfolio</td>
              </tr>
            </tbody>
          </table>
        </React.Fragment>
      );
    return (
      <React.Fragment>
        {" "}
        <p>Your Stocks:</p>
        <table className="table">
          <thead>
            <tr>
              <th>Stock ticker</th>
              <th>Average Price</th>
              <th>Quantity</th>
              <th>Current Value</th>
              <th>Capital Gains</th>
              <th>Dividends</th>
              <th>Currency</th>
              <th>Return</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.stockList.map((stock) => (
              <tr key={stock.stockID}>
                <td>{stock.stockID}</td>
                <td>{stock.price}</td>
                <td>{stock.quantity}</td>
                <td>{stock.value}</td>
                <td>{stock.capitalGains}</td>
                <td>{stock.dividends}</td>
                <td>{stock.currency}</td>
                <td>{stock.return}</td>
                <td>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default StockTable;
