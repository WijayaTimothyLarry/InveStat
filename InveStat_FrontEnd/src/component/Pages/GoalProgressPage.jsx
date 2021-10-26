import React, { Component } from "react";
import { Link } from "react-router-dom";
import DoughnutChart from "./../common/goaldoughnutchart";
class GoalProgressPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Link className="btn btn-primary" to="/goal-setting/set-goal">
          Set Goal
        </Link>
        <main className="container">
          <DoughnutChart />
          <h1>test</h1>
        </main>
      </React.Fragment>
    );
  }
}

export default GoalProgressPage;
