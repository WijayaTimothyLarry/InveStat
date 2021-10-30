import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
// import "../../css/table.css";

const Table = ({ sortColumn, onSort, columns, data }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
