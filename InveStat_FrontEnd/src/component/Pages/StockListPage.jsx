import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { paginate } from "./../utils/paginate";
import SearchBox from "../common/searchBox";
import Pagination from "../common/pagination";
import { getStockList } from "../../services/watchlistService";
import StockListTable from "./../Tables/StockListTable";

class StockListPage extends Component {
  state = {
    stockList: [],
    pageSize: 50,
    currentPage: 1,
    searchQuery: "",
    sortColumn: { path: "Code", order: "asc" },
  };

  componentDidMount() {
    this.setState({ stockList: getStockList() });
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
      filtered = stockList.filter(
        (s) =>
          s.Name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          s.Code.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const stocks = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: stocks };
  };
  render() {
    const count = this.state.stockList.length;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <h1>Your Watchlist is empty</h1>;

    const { totalCount, data } = this.getPagedData();
    return (
      <div className="row">
        <div className="col">
          <p>Showing {totalCount} stocks in the watchlist </p>
          <SearchBox
            onChange={this.handleSearch}
            value={this.state.searchQuery}
          />
          <StockListTable
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

export default StockListPage;
