import React, { Component } from "react";
import Link from "react-router-dom/Link";
import Table from "../common/table";
import Like from "../common/like";
class StockListTable extends Component {
  columns = [
    {
      path: "symbol",
      label: "Ticker",
      content: (stock) => (
        <Link to={`/stock-page/${stock.symbol}`}>{stock.symbol}</Link>
      ),
    },
    {
      path: "name",
      label: "Name",
    },
    {
      path: "price",
      label: "Price",
      content: (stock) => <p>$ {stock.price}</p>,
    },
    { path: "exchangeShortName", label: "Exchange" },
    {
      key: "like",
      content: (stock) => (
        <Like liked={stock.liked} onClick={() => this.props.onLike(stock)} />
      ),
    },
  ];
  render() {
    const { stockList, onSort, sortColumn } = this.props;
    return (
      <Table
        data={stockList}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      ></Table>
    );
  }
}

export default StockListTable;
