import React, { Component } from "react";
import Link from "react-router-dom/Link";
import Table from "../common/table";

class TransactionTable extends Component {
  columns = [
    {
      path: "purchasedStockStockTickerId    ",
      label: "Stock",
      content: (transaction) => (
        <Link to={`/stock-page/${transaction.purchasedStockStockTickerId}`}>
          {transaction.purchasedStockStockTickerId}
        </Link>
      ),
    },
    {
      path: "transactionType",
      label: "type",
    },
    {
      path: "TransactionPrice",
      label: "Price",
      content: (transaction) => <p>$ {transaction.TransactionPrice}</p>,
    },
    {
      path: "brokerageCost",
      label: "Brokerage Cost",
      content: (transaction) => <p>$ {transaction.brokerageCost}</p>,
    },
    { path: "changeInQuantity", label: "Quantity" },
    {
      key: "totalCost",
      label: "Total Transaction",
      content: (transaction) => (
        <p>
          ${" "}
          {transaction.TransactionPrice * transaction.changeInQuantity +
            transaction.brokerageCost}
        </p>
      ),
    },
    {
      path: "transactionDate",
      label: "Transaction Date",
      content: (transaction) => (
        <p>$ {transaction.transactionDate.slice(0, 10)}</p>
      ),
    },
    {
      key: "delete",
      content: (transaction) => (
        <button
          onClick={() => this.props.onDelete(transaction)}
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

export default TransactionTable;
