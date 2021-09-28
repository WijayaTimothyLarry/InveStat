import React, { Component } from "react";
import Link from "react-router-dom/Link";
import Table from "./common/table";

class StockTable extends Component {
  columns = [
    {
      path: "stockID",
      label: "Stock",
      content: (stock) => (
        <Link to={`/stock/${stock.stockID}`}>{stock.stockID}</Link>
      ),
    },
    { path: "price", label: "Price" },
    { path: "quantity", label: "Quantity" },
    { path: "value", label: "Value" },
    { path: "capitalGains", label: "Capital Gains" },
    { path: "dividends", label: "Dividends" },
    { path: "currency", label: "Currency" },
    { path: "return", label: "Return" },
    {
      key: "delete",
      content: (portfolio) => (
        <button
          onClick={() => this.props.onDelete(portfolio)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
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

export default StockTable;
