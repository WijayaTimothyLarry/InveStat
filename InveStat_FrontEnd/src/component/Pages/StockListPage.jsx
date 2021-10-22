import React, { Component } from "react";
import _ from "lodash";
import { paginate } from "./../utils/paginate";
import SearchBox from "../common/searchBox";
import Pagination from "../common/pagination";
import StockListTable from "./../Tables/StockListTable";
import watchlistService from "../../services/watchlistService";
import auth from "../../services/authService";

class StockListPage extends Component {
  state = {
    stockList: [],
    pageSize: 50,
    currentPage: 1,
    searchQuery: "",
    sortColumn: { path: "symbol", order: "asc" },
  };

  async componentDidMount() {
    const stockList = await watchlistService.getStockList();
    console.log(stockList);
    const watchlisted = await watchlistService.getUserWatchList(auth.getJwt());
    for (const stock of watchlisted) {
      console.log(stock);
      const wStock = stockList.findIndex((s) => s.symbol === stock.stockID);
      stockList[wStock].liked = true;
      stockList[wStock].id = stock.id;
    }
    this.setState({ stockList });
  }

  handleLike = async (stock) => {
    const stockList = [...this.state.stockList];
    const index = stockList.indexOf(stock);
    stockList[index] = { ...stockList[index] };
    const { id } = stockList[index];
    if (stockList[index].liked) {
      stockList[index].id = stockList[index].symbol;
      stockList[index].liked = !stockList[index].liked;
      this.setState({ stockList });
      watchlistService.deleteUserWatchList(id);
    } else {
      stockList[index].liked = !stockList[index].liked;
      this.setState({ stockList });
      const res = await watchlistService.addUserWatchList(
        stockList[index].symbol,
        auth.getCurrentUserEmail()
      );
      const { id: newId } = res;
      stockList[index].id = newId;
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
      filtered = stockList.filter(
        (s) =>
          s.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          s.symbol.toLowerCase().startsWith(searchQuery.toLowerCase())
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
          <h1 className="watchlist-title mb-4">List of Stock</h1>
          <p>Showing {totalCount} stocks in the stocklist </p>
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
        </main>
      </React.Fragment>
    );
  }
}

export default StockListPage;
