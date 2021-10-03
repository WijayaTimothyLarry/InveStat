import React, { Component } from "react";
import Table from "../common/table";
import { Link } from "react-router-dom";

class PortfolioTable extends Component {
  columns = [
    {
      path: "portfolioName",
      label: "Portfolio",
      content: (portfolio) => (
        <Link to={`/portfolio/${portfolio._id}`}>
          {portfolio.portfolioName}
        </Link>
      ),
    },
    { path: "totalValue", label: "Total Value" },
    { path: "pnl", label: "PNL" },
    { path: "ytdReturn", label: "YTD Return" },
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
    const { portfolioList, onSort, sortColumn } = this.props;
    return (
      <Table
        data={portfolioList}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      ></Table>
    );
  }
}

export default PortfolioTable;
