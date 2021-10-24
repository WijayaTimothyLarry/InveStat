import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import WatchListTable from "../Tables/WatchListTable";
import { paginate } from "./../utils/paginate";
import SearchBox from "../common/searchBox";
import Pagination from "../common/pagination";
import watchlistService from "../../services/watchlistService";
import auth from "../../services/authService";
import stockDataService from "../../services/stockDataService";

class WatchListPage extends Component {
  state = {
    stockList: [],
    pageSize: 10,
    currentPage: 1,
    searchQuery: "",
    sortColumn: { path: "stockID", order: "asc" },
  };

  async componentDidMount() {
    const stockList = await watchlistService.getUserWatchList(auth.getJwt());
    for (const stock of stockList) {
      const stockData = await stockDataService.getStockQuote(stock.stockID);
      console.log(stockData);
      stock.price = stockData.price;
      stock.lastClose = stockData.previousClose;
      stock.lastOpen = stockData.open;
      stock.dayChange = stockData.changesPercentage.toFixed(3);
    }
    this.setState({ stockList });
  }

  handleLike = (stock) => {
    const stockList = [...this.state.stockList];
    const index = stockList.indexOf(stock);
    stockList[index] = { ...stockList[index] };
    const removedStockId = stockList[index].id;
    if (stockList[index].liked) {
      stockList[index].liked = !stockList[index].liked;
      const { stockList: original } = this.state;
      const newStockList = original.filter((s) => s.id != removedStockId);
      this.setState({ stockList: newStockList });
      const { id } = stockList[index];
      watchlistService.deleteUserWatchList(id);
    } else {
      stockList[index].liked = !stockList[index].liked;
      this.setState({ stockList });
      watchlistService.addUserWatchList(
        stockList[index].Code,
        auth.getCurrentUserEmail()
      );
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, searchQuery, stockList } =
      this.state;

    let filtered = stockList;
    if (searchQuery)
      filtered = stockList.filter((s) =>
        s.stockID.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const stocks = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: stocks };
  };
  render() {
    const { pageSize, currentPage, sortColumn } = this.state;

    const { totalCount, data } = this.getPagedData();
    return (
      <React.Fragment>
        <main className="container">
          <h1 className="watchlist-title mb-4">Watchlist</h1>
          <p>
            Showing {totalCount} stocks in the watchlist
            <Link className="btn btn-primary float-right" to="/stocklist">
              Add New Stock
            </Link>
          </p>
          <SearchBox
            onChange={this.handleSearch}
            value={this.state.searchQuery}
          />
          <WatchListTable
            stockList={data}
            onLike={this.handleLike}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default WatchListPage;
