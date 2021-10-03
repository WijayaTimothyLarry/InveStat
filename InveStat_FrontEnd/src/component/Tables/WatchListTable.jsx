import React, { Component } from "react";
import Link from "react-router-dom/Link";
import Table from "../common/table";
import Like from "../common/like";
class WatchListTable extends React.Component {
  columns = [
    {
      path: "stockID",
      label: "Stock",
      content: (stock) => (
        <Link to={`/stock/${stock.stockID}`}>{stock.stockID}</Link>
      ),
    },
    { path: "price", label: "Price" },
    { path: "lastClose", label: "Last Close" },
    { path: "lastOpen", label: "Last Open" },
    { path: "dayChange", label: "Day Change" },
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
