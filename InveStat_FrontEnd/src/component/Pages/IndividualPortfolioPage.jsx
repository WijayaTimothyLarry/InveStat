import React, { Component } from "react";
import Link from "react-router-dom/Link";
import _ from "lodash";
import StockTable from "../Tables/StockTable";
import purchasedStockService from "../../services/purchasedStockService";

class IndividualPortfolioPage extends Component {
  state = {
    stockList: [],
    sortColumn: { path: "stockID", order: "asc" },
  };

  async componentDidMount() {
    const portfolioId = this.props.match.params.id;
    const { data: stockList } =
      await purchasedStockService.getPurchasedStockList(portfolioId);
    this.setState({ stockList });
  }

  handleDelete = (stock) => {
    const stockList = this.state.stockList.filter((s) => s.id !== stock.id);
    this.setState({ stockList });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { sortColumn, stockList: allStock } = this.state;
    const stockList = _.orderBy(
      allStock,
      [sortColumn.path],
      [sortColumn.order]
    );
    return { totalCount: stockList.length, data: stockList };
  };

  render() {
    const count = this.state.stockList.length;
    const { sortColumn } = this.state;
    if (count === 0)
      return (
        <React.Fragment>
          <main className="container">
            <h1 className="portfolio-name">
              {this.props.match.params.portfolioname}
            </h1>
            <p>There are no stock in the database.</p>
            <Link
              className="btn btn-primary float-right  "
              to="/transaction/new"
            >
              Add Transaction
            </Link>
          </main>
        </React.Fragment>
      );

    const { totalCount, data } = this.getPagedData();
    return (
      <React.Fragment>
        <main className="container">
          <h1 className="portfolio-name">
            {this.props.match.params.portfolioname}
          </h1>

          <p className="mt-5">
            Showing {totalCount} stocks in the database
            <Link
              className="btn btn-primary float-right  "
              to="/transaction/new"
            >
              Add Transaction
            </Link>
          </p>
          <StockTable
            stockList={data}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
        </main>
        <div className="col"></div>
      </React.Fragment>
    );
  }
}

export default IndividualPortfolioPage;
