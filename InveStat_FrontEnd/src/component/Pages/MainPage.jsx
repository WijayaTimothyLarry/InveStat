import React, { Component } from "react";
import Link from "react-router-dom/Link";
import _ from "lodash";
import auth from "../../services/authService";
import "../../css/MainPage.css";
import "../../Images/Profile.png";
import portfolioService from "../../services/portfolioService";
import PortfolioTable from "../Tables/PortfolioTable";
import progressIcon from "../../Images/progress-chart.png";
import calendarIcon from "../../Images/schedule.png";
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
      this.setState({ portfolioList });
      const portfolioGraphData = await portfolioService.getGraphData(
        auth.getJwt()
      );
      this.setState({ portfolioGraphData });
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
      this.setState({ portfolioList });

      const res = await portfolioService.deletePortfolio(
        auth.getJwt(),
        portfolio.id
      );
      console.log(res);
      const portfolioGraphData = await portfolioService.getGraphData(
        auth.getJwt()
      );
      this.setState({ portfolioGraphData });
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
        <div id="container-mainPage">
          <div id="container-mainPage-left">

            <p id="welcomeBack-msg">Welcome Back, {user}. </p>

            <div class="group" id="goalProgressBlock-mainPage">
              <p id="goalProgress-title"> Current Progress</p>
              <Link id="progress-link" to="/goal-setting">
                <img id="progess-icon" src={progressIcon}></img>
              </Link>
              <p id="goalProgress-text"> 50%</p>
            </div>

            <div class="group" id="daysLeft-mainPage">
              <p id="daysLeft-title"> Days Left</p>
              <Link id="progress-link" to="/goal-setting">
                <img id="progess-icon" src={calendarIcon}></img>
              </Link>
              <p id="daysLeft-text"> 230 days</p>
            </div>
          </div>

          {/*Graph*/}
          <div id="container-mainPage-right">
            <div id="mainPage-graph">
              <MainGraph portfolioGraphData={this.state.portfolioGraphData} />
            </div>

            {/* table msg */}
            <div id="mainPage-tableWrapper">
              {totalCount ? (
                <div>
                  <div id="mainPage-msg-1">

                    Showing {totalCount} portfolio in the database:
                  </div>
                  <div>
                    <Link
                      className="btn btn-outline-primary float-right"
                      id="add-new-portfolio-v1-mainPage"
                      to="/portfolio/new"
                    >
                      + New Portfolio
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <div id="mainPage-msg-2">

                    You have no portfolio right now.
                  </div>
                  <div>
                    <Link
                      className="btn btn-outline-primary float-right"
                      id="add-new-portfolio-v1-mainPage"
                      to="/portfolio/new"
                    >
                      + New Portfolio
                    </Link>
                  </div>
                </div>
              )}

              {/* portfolio table  */}
              <div id="tableWrapperInner-MainPage">
                <PortfolioTable
                  id="portfolio-table-mainPage"
                  portfolioList={data}
                  onDelete={this.handleDelete}
                  onSort={this.handleSort}
                  sortColumn={sortColumn}
                />
              </div>
            </div>
            {/* end of tablewrapper */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default MainPage;
