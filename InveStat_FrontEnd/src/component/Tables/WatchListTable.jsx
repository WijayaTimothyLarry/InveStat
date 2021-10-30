import React, { Component } from "react";
import Link from "react-router-dom/Link";
import Table from "../common/table";
import Like from "../common/like";
class WatchListTable extends Component {
  columns = [
    {
      path: "stockID",
      label: "Stock",
      content: (stock) => (
        <Link to={`/stock-page/${stock.stockID}`}>{stock.stockID}</Link>
      ),
    },
    {
      path: "price",
      label: "Price",
      content: (stock) => <p>$ {stock.price}</p>,
    },
    {
      path: "lastClose",
      label: "Last Close",
      content: (stock) => <p>$ {stock.lastClose}</p>,
    },
    {
      path: "lastOpen",
      label: "Open",
      content: (stock) => <p>$ {stock.lastOpen}</p>,
    },
    {
      path: "dayChange",
      label: "Day Change",
      content: (stock) => <p>{stock.dayChange}%</p>,
    },
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

export default WatchListTable;
