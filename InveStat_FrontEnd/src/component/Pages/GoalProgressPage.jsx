import React, { Component } from "react";
import { Link } from "react-router-dom";
import goalsettingService from "../../services/goalsettingService";
import portfolioHistoryService from "../../services/portfolioHistoryService";
import DoughnutChart from "./../common/goaldoughnutchart";
class GoalProgressPage extends Component {
  state = { goalData: {}, currentInvestmentValue: "" };
  async componentDidMount() {
    const goalData = await goalsettingService.getGoal();
    this.setState({ goalData });
    const currentInvestmentValue =
      await portfolioHistoryService.getLatestPortfolioValue();
    this.setState({ currentInvestmentValue });
  }
  render() {
    return (
      <React.Fragment>
        <Link className="btn btn-primary" to="/goal-setting/set-goal">
          Set Goal
        </Link>
        <main className="container">
          <DoughnutChart
            goalData={this.state.goalData}
            currentInvestmentValue={this.state.currentInvestmentValue}
          />
          <h1>test</h1>
        </main>
      </React.Fragment>
    );
  }
}

export default GoalProgressPage;
