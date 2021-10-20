import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import WatchListTable from "../Tables/WatchListTable";
import { paginate } from "./../utils/paginate";
import SearchBox from "../common/searchBox";
import Pagination from "../common/pagination";
import { getStockList } from "./../../controller class/WatchlistController";
import watchlistService from "../../services/watchlistService";
import auth from "../../services/authService";
import StockListPage from "./StockListPage";

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
    this.setState({ stockList });
  }

  handleLike = (stock) => {
    const stockList = [...this.state.stockList];
    const index = stockList.indexOf(stock);
    stockList[index] = { ...stockList[index] };
    stockList[index].liked = !stockList[index].liked;
    this.setState({ stockList });
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
    const count = this.state.stockList.length;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <h1>Your watchlist is empty</h1>;

    const { totalCount, data } = this.getPagedData();
    return (
      <div className="row">
        <div className="col">
          <Link className="btn btn-primary" to="/movies/new">
            New Stock
          </Link>
          <p>Showing {totalCount} stocks in the watchlist </p>
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
        </div>
      </div>
    );
  }
}

export default WatchListPage;
