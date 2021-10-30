import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import auth from "../../services/authService";
import stockDataService from "../../services/stockDataService";
import transactionService from "../../services/transactionService";
import StockGraph from "../common/stockgraph";
import TransactionTable from "../Tables/TransactionTable";
import "../../css/IndividualPortfolioPage.css";

class IndividualStockPage extends Component {
  state = {
    stockData: { date: [], price: [], symbol: "" },
    transactionList: [],
    sortColumn: { path: "stockID", order: "asc" },
  };

  async componentDidMount() {
    auth.checkExpiry();
    const tickerID = this.props.match.params.ticker;
    const stockData = await stockDataService.getStockHistoricalData(tickerID);
    console.log("test", stockData);
    this.setState({ stockData });

    const transactionList = await transactionService.getTransactionList(
      tickerID
    );
    this.setState({ transactionList });
  }

  handleDelete = async (transaction) => {
    const transactionList = this.state.transactionList.filter(
      (t) => t.id !== transaction.id
    );
    this.setState({ transactionList });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { sortColumn, transactionList: allTransaction } = this.state;
    const transactionList = _.orderBy(
      allTransaction,
      [sortColumn.path],
      [sortColumn.order]
    );
    return { totalCount: transactionList.length, data: transactionList };
  };
  //<StockGraph stockData={stockData} />
  render() {
    const { stockData } = this.state;
    const { totalCount, data } = this.getPagedData();
    console.log(stockData);
    const { sortColumn } = this.state;
    return (
      <React.Fragment>
        <div id="bg-IndivStockPage">
          <div className="container" id="container-IndivStockPage">
            <h1 id="stockName">{this.props.match.params.ticker}</h1>
            <div id="indivStockGraphWrapper">
              <StockGraph stockData={stockData} />
            </div>

            <div >

              <p id="IndivStockPage-msg">
                Showing {totalCount} transaction for this stock in the database:
                <Link
                  className="float-right"
                  id="IndivStockPage-add-button"
                  to="/transaction/new"
                >
                  + Add New Transaction for this Stock
                </Link>
              </p>
            </div>

            <div id="IndivStockTableWraper">
              <TransactionTable
                stockList={data}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />
            </div>
          </div>
        </div>

        {/* <h1>{this.props.match.params.ticker}</h1>
        <StockGraph stockData={stockData} />
        <h2>Your transaction for this stock</h2>
        <p className="mt-5">
          Showing {totalCount} transaction for this stock in the database
          <Link className="btn btn-primary float-right  " to="/transaction/new">
            Add Transaction
          </Link>
        </p>
        <TransactionTable
          stockList={data}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
          sortColumn={sortColumn}
        /> */}
      </React.Fragment>
    );
  }
}

export default IndividualStockPage;
