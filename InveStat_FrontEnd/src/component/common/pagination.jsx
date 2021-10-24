import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
//import { Link } from "react-router-dom";
const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;

  var pages = _.range(1, pagesCount + 1);

  if (pagesCount <= 10) {
    return (
      <nav>
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <button onClick={() => onPageChange(page)} className="page-link">
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  } else {
    if (currentPage <= 3) {
      pages = [1, 2, 3, 4, 5];
    } else {
      pages = _.range(currentPage - 2, currentPage + 3);
    }
    return (
      <nav>
        <ul className="pagination">
          <li key="previous" className="page-item">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="page-link"
            >
              Previous
            </button>
          </li>
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <button onClick={() => onPageChange(page)} className="page-link">
                {page}
              </button>
            </li>
          ))}
          <li key="next" className="page-item">
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="page-link"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  }
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default Pagination;
