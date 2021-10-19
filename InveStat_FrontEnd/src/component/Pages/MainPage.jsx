import React, { Component } from "react";
import Link from "react-router-dom/Link";
import _ from "lodash";
import PortfolioTable from "../Tables/PortfolioTable";
import portfolioService from "../../services/portfolioService";
import auth from "../../services/authService";

class MainPage extends Component {
  state = {
    portfolioList: [],
    sortColumn: { path: "portfolioName", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await portfolioService.getPortfolioList(auth.getJwt());
    this.setState({
      portfolioList: data,
    });
  }

  handleDelete = async (portfolio) => {
    const portfolioList = this.state.portfolioList.filter(
      (p) => p.id !== portfolio.id
    );
    const { id } = portfolio;
    console.log(id);
    this.setState({ portfolioList });

    //try {
    //  await portfolioService.deletePortfolio(portfolio.id);
    //} catch (ex) {
    //  if (ex.response && ex.responsee.status === 404) {
    //    toast.error("This movie is not in the database.");
    //  }
    //  this.setState({ movies: originalMovies });
    //}
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { sortColumn, portfolioList: allPortfolio } = this.state;
    const portfolioList = _.orderBy(
      allPortfolio,
      [sortColumn.path],
      [sortColumn.order]
    );
    return { totalCount: portfolioList.length, data: portfolioList };
  };

  render() {
    const count = this.state.portfolioList.length;
    const { sortColumn } = this.state;
    const user = auth.getCurrentUser();
    if (count === 0)
      return (
        <React.Fragment>
          <main className="container">
            <h1 className="welcome-message mb-5">Welcome Back {user}</h1>
            <p>
              There are no portfolio in the database.
              <Link
                className="btn btn-primary float-right  "
                to="/portfolio/new"
              >
                New Portfolio
              </Link>
            </p>
          </main>
        </React.Fragment>
      );

    const { totalCount, data } = this.getPagedData();
    return (
      <React.Fragment>
        <main className="container">
          <h1 className="welcome-message mb-5">Welcome Back {user}</h1>
          <p className="mt-5">
            Showing {totalCount} portfolio in the database
            <Link
              className="btn btn-outline-primary float-right"
              to="/portfolio/new"
            >
              New Portfolio
            </Link>
          </p>
          <PortfolioTable
            portfolioList={data}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
        </main>
        <div className="col"></div>
      </React.Fragment>
    );
  }
}

export default MainPage;
