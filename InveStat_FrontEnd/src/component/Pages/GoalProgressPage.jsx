import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/GoalProgressPage.css";
import "../../Images/bg2.png";
import goalsettingService from "../../services/goalsettingService";
import portfolioHistoryService from "../../services/portfolioHistoryService";
import DoughnutChart from "./../common/goaldoughnutchart";
class GoalProgressPage extends Component {
  state = { goalData: {}, currentInvestmentValue: "", completion: "" };
  async componentDidMount() {
    const goalData = await goalsettingService.getGoal();
    console.log(goalData);
    this.setState({ goalData });
    const currentInvestmentValue =
      await portfolioHistoryService.getLatestPortfolioValue();
    this.setState({ currentInvestmentValue });
    const achievedgoal = currentInvestmentValue.totalValue;
    const completion = (
      (parseFloat(achievedgoal) / parseFloat(goalData.overallTarget)) *
      100
    ).toFixed(2);
    this.setState({ completion });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.goalData == "" ? (
          <div className="bg-pic">
            <div className="bg" id="bg-goalProgress">
              <div className="container">
                <h1 class="welcome-msg">Welcome to InveStat, my name</h1>
                {/* add here the name of user later */}
                <p className="welcome-msg-2">
                  InveStat is a platform for you to track your investment goals
                  and analyse how your current portfolio’s perform against your
                  goal. It aims to help investors to gain a better understanding
                  of their investment progress overtime, and how far they have
                  achieved against their goals.
                </p>
                <p className="welcome-msg-3">
                  Click here and set your own investment goal now!
                </p>
                <Link
                  className="btn btn-primary"
                  id="setGoal-button"
                  to="/goal-setting/set-goal"
                >
                  Set Goal
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div id="container-goalProgress">
            <div id="container-goalProgress-left">
              <div class="group" id="goalProgressBlock-goalProgressPage">
                <p id="currentGoal-title">
                  My Goal
                  <Link
                    className="btn btn-primary"
                    id="setGoal-button-v2"
                    to="/goal-setting/set-goal"
                  >
                    Set Goal
                  </Link>
                </p>
                <div id="currentGoal-left">
                  <p id="goalProgress-col"> Starting Cash:</p>
                  <p id="goalProgress-col"> Target Return:</p>
                  <p id="goalProgress-col"> Current Return:</p>
                  <p id="goalProgress-col">
                    <b>%Progress:</b>
                  </p>
                </div>

                <div id="currentGoal-right">
                  <p id="goalProgress-content"> 123</p>
                  <p id="goalProgress-content"> 123</p>
                  <p id="goalProgress-content"> 123</p>
                  <p id="goalProgress-content">
                    <b>123</b>
                  </p>
                </div>
              </div>

              <div class="group" id="goalStatsBlock-goalProgressPage">
                <p id="goalStats-title">My Performance</p>
                <div id="performance-chart">
                  Insert performance over time line chart
                </div>
              </div>
            </div>
            <div id="container-goalProgress-right">
              <div id="goalPage-graph">
                <DoughnutChart
                  goalData={this.state.goalData}
                  currentInvestmentValue={this.state.currentInvestmentValue}
                />
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default GoalProgressPage;
