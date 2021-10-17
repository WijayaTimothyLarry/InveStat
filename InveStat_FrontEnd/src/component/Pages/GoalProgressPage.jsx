import React, { Component } from "react";
import { Link } from "react-router-dom";

class GoalProgressPage extends Component {
  render() {
    return (
      <React.Fragment>
        <main className="container">
          <Link className="btn btn-primary" to="/goal-setting/set-goal">
            Set Goal
          </Link>
        </main>
      </React.Fragment>
    );
  }
}

export default GoalProgressPage;
