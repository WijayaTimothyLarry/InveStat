import React, { Component } from "react";
import _ from "lodash";
import stockDataService from "../../services/stockDataService";
import StockGraph from "../common/stockgraph";
import TransactionTable from "../Tables/TransactionTable";
import { Link } from "react-router-dom";
import transactionService from "../../services/transactionService";

class IndividualStockPage extends Component {
  state = {
    stockData: {},
    transactionList: [],
    sortColumn: { path: "stockID", order: "asc" },
  };

  async componentDidMount() {
    const tickerID = this.props.match.params.ticker;
    const stockData = await stockDataService.getStockHistoricalData(tickerID);
    this.setState({ stockData });

    const transactionList = await transactionService.getTransactionList(
      tickerID
    );
    console.log(transactionList);
    this.setState({ transactionList });
  }

  handleDelete = async (transaction) => {
    console.log(transaction.id);
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

  render() {
    const { stockData } = this.state;
    const { totalCount, data } = this.getPagedData();
    console.log(data);
    const { sortColumn } = this.state;
    return (
      <React.Fragment>
        <h1>{this.props.match.params.ticker}</h1>
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
        />
      </React.Fragment>
    );
  }
}

export default IndividualStockPage;
