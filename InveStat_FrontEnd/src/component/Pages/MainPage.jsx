import React, { Component } from "react";
import Link from "react-router-dom/Link";
import _ from "lodash";
import PortfolioTable from "../Tables/PortfolioTable";
import portfolioService from "../../services/portfolioService";
import auth from "../../services/authService";
import "../../css/MainPage.css";
import "../../Images/Profile.png"

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
    this.setState({ portfolioList });

    const res = await portfolioService.deletePortfolio(
      auth.getJwt(),
      portfolio.id
    );
    console.log(res);
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
    //f (count === 0)
    // return (
    //   <React.Fragment>
    //     <main className="container">
    //       <h1 className="welcome-message mb-5">Welcome Back {user}</h1>
    //       <p>
    //         There are no portfolio in the database.
    //         <Link
    //           className="btn btn-primary float-right  "
    //           to="/portfolio/new"
    //         >
    //           New Portfolio
    //         </Link>
    //       </p>
    //     </main>
    //   </React.Fragment>
    // );

    const { totalCount, data } = this.getPagedData();
    return (
      // <React.Fragment>
        <div id = "container-mainPage">
          <div id = "container-mainPage-left">
            welcome back

          </div>

          <div id = "container-mainPage-right">
            <div id = "mainPage-graph">
              Placeholder for main page graph 
            </div>

            <div id = "mainPage-tableWrapper"> 
              {totalCount ? (
                <div>
                  <div id="mainPage-msg-1"> Showing {totalCount} portfolio in the database</div>
                  <div><Link
                    className="btn btn-outline-primary float-right"
                    to="/portfolio/new"
                  >
                    New Portfolio
                  </Link></div>
                </div>
              ) : (
                <p id="mainPage-msg-2">
                  You have no portfolio right now.
                  <Link
                    className="btn btn-primary" id="add-new-portfolio-v1-mainPage"
                    to="/portfolio/new"
                  >+ New Portfolio 
                  </Link>
                </p>
              )}
              <PortfolioTable id="portfolio-table-mainPage"
                portfolioList={data}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />

            </div>
          </div>
        </div>
        
        
        
      // {/* </React.Fragment> */}
    );
  }}

{/* /* <main className="container">
          <h1 className="welcome-message mb-4">Welcome Back {user}</h1>
          
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
        <div className="col"></div> */} 

  {/* ///////

  // const Wrapper = styled.div`
  //   background-image: url(${bg1.png});
  //   background-position: center;
  //   background-size: cover;
  //   background-repeat: no-repeat;
  //   width: 100%;
  //   height: 100%;
  //   display: flex;
  // `; */}




export default MainPage;
