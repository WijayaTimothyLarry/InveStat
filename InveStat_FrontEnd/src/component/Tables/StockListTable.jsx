import React, { Component } from "react";
import Link from "react-router-dom/Link";
import Table from "../common/table";
import Like from "../common/like";
class StockListTable extends Component {
  columns = [
    {
      path: "Code",
      label: "Ticker",
      content: (stock) => (
        <Link to={`/stock-page/${stock.Code}/${stock.Name}`}>{stock.Code}</Link>
      ),
    },
    {
      path: "Name",
      label: "Name",
    },
    { path: "Exchange", label: "Exchange" },

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
