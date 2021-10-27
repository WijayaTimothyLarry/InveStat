import React, { Component } from "react";
import Link from "react-router-dom/Link";
import _ from "lodash";
import auth from "../../services/authService";
import portfolioService from "../../services/portfolioService";
import PortfolioTable from "../Tables/PortfolioTable";
import MainGraph from "../common/maingraph";

class MainPage extends Component {
  state = {
    portfolioList: [],
    sortColumn: { path: "portfolioName", order: "asc" },
    portfolioGraphData: { portfolioTotalValue: [], date: [] },
  };

  async componentDidMount() {
    auth.checkExpiry();
    try {
      const portfolioList = await portfolioService.getCompletePortfolioList(
        auth.getJwt()
      );
      this.setState({
        portfolioList,
      });
      const portfolioGraphData = await portfolioService.getGraphData(
        auth.getJwt()
      );
      console.log(portfolioGraphData);
      console.log(portfolioGraphData.date);
      this.setState({
        portfolioGraphData,
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  handleDelete = async (portfolio) => {
    try {
      const portfolioList = this.state.portfolioList.filter(
        (p) => p.id !== portfolio.id
      );
      const { id } = portfolio;
      console.log(id);
      this.setState({ portfolioList });

      const res = await portfolioService.deletePortfolio(
        auth.getJwt(),
        portfolio.id
      );
      console.log(res);
      const portfolioGraphData = await portfolioService.getGraphData(
        auth.getJwt()
      );
      console.log(portfolioGraphData);
      console.log(portfolioGraphData.date);
      this.setState({
        portfolioGraphData,
      });
    } catch (ex) {
      console.log(ex);
    }
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
    //const count = this.state.portfolioList.length;
    const { sortColumn } = this.state;
    const user = auth.getCurrentUser();

    const { totalCount, data } = this.getPagedData();
    return (
      <React.Fragment>
        <main className="container">
          <h1 className="welcome-message mb-4">Welcome Back {user}</h1>
          <MainGraph portfolioGraphData={this.state.portfolioGraphData} />
          {totalCount ? (
            <p>
              Showing {totalCount} portfolio in the database
              <Link
                className="btn btn-outline-primary float-right"
                to="/portfolio/new"
              >
                New Portfolio
              </Link>
            </p>
          ) : (
            <p>
              You have no portfolio right now.
              <Link
                className="btn btn-outline-primary float-right"
                to="/portfolio/new"
              >
                New Portfolio
              </Link>
            </p>
          )}

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
