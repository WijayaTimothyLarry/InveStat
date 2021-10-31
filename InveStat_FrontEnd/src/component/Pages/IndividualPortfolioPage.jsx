import React, { Component } from "react";
import Link from "react-router-dom/Link";
import _ from "lodash";
import purchasedStockService from "../../services/purchasedStockService";
import stockDataService from "../../services/stockDataService";
import auth from "../../services/authService";
import StockTable from "../Tables/StockTable";
import "../../css/IndividualPortfolioPage.css";


class IndividualPortfolioPage extends Component {
  state = {
    stockList: [],
    sortColumn: { path: "stockID", order: "asc" },
  };

  async componentDidMount() {
    auth.checkExpiry();
    const portfolioId = this.props.match.params.id;
    const { data: stockList } =
      await purchasedStockService.getPurchasedStockList(portfolioId);
    for (const stock of stockList) {
      const ticker = stock.stockTickerId;
      const data = await stockDataService.getStockQuote(ticker);
      stock.costPrice = (
        stock.avgPurchasePriceUsd * stock.totalQuantity
      ).toFixed(2);
      stock.value = (data.price * stock.totalQuantity).toFixed(2);
      stock.capitalGains = (
        stock.value -
        stock.totalQuantity * stock.avgPurchasePriceUsd
      ).toFixed(2);
      stock.return = ((stock.capitalGains / stock.costPrice) * 100).toFixed(2);
    }
    console.log(stockList);
    this.setState({ stockList });
  }

  handleDelete = async (stock) => {
    console.log(stock.id);
    const stockList = this.state.stockList.filter((s) => s.id !== stock.id);
    this.setState({ stockList });

    const res = await purchasedStockService.deletePurchasedStock(stock.id);
    console.log(res);
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
          <div  id = "bg-IndivPortPage">
            <div className="container" id="container-IndivPortPage">
              <p id="portName">{this.props.match.params.portfolioname}</p>
              <p id="IndivPortPage-msg">There are no stock in the database.
                <Link className="btn btn-primary" id = "IndivPortPage-add-button"to="/transaction/new">
                    + Add New Transaction to my Portfolio
                </Link>
              </p>

            </div>
          </div>


        </React.Fragment>
      );

    const { totalCount, data } = this.getPagedData();
    return (
      <React.Fragment>
          <div  id = "bg-IndivPortPage">
            <div className="container" id="container-IndivPortPage">
            <p id="portName">{this.props.match.params.portfolioname}</p>
              <p id="IndivPortPage-msg">Showing {totalCount} stocks in the database:
                <Link className="btn btn-primary" id = "IndivPortPage-add-button"to="/transaction/new">
                    + Add New Transaction to my Portfolio
                </Link>
              </p>

              <div id="IndivPortTableWraper">
                <StockTable
                  stockList={data}
                  onDelete={this.handleDelete}
                  onSort={this.handleSort}
                  sortColumn={sortColumn}
                />
              </div>

 
            </div>
          </div>

        {/* <main className="container">
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
        <div className="col"></div> */}
      </React.Fragment>
    );
  }
}

export default IndividualPortfolioPage;


          {/* <main className="container">
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
          </main> */}


          
              

              {/* <div id="IndivPortTableWraper">
                <StockTable
                  stockList={data}
                  onDelete={this.handleDelete}
                  onSort={this.handleSort}
                  sortColumn={sortColumn}
                />
              </div> */}