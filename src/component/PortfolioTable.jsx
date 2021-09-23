import React, { Component } from "react";
import { getPortfolioList } from "../controller class/MainPageController";

class PortfolioTable extends Component {
  state = {
    portfolioList: getPortfolioList,
  };

  render() {
    const numberOfPortfolio = this.state.portfolioList.length;
    if (numberOfPortfolio === 0)
      return (
        <React.Fragment>
          <navBar />
          <p>
            Your Portfolio:
            <button className="btn float-right mr-2 ">Add Portfolio</button>
          </p>
          <table className="table">
            <thead>
              <tr>
                <th>Portfolio Name</th>
                <th>Total Value</th>
                <th>PNL</th>
                <th>YTD Return</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> You dont have any portfolio</td>
              </tr>
            </tbody>
          </table>
        </React.Fragment>
      );
    return (
      <React.Fragment>
        <p>Your Portfolio:</p>
        <table className="table">
          <thead>
            <tr>
              <th>Portfolio Name</th>
              <th>Total Value</th>
              <th>PNL</th>
              <th>YTD Return</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.portfolioList.map((portfolio) => (
              <tr key={portfolio.portfolioID}>
                <td>{portfolio.portfolioID}</td>
                <td>{portfolio.totalValue}</td>
                <td>{portfolio.pnl}</td>
                <td>{portfolio.ytdReturn}</td>
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

export default PortfolioTable;
