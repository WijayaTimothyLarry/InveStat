import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/GoalProgressPage.css";
import "../../Images/bg2.png"


class GoalProgressPage extends Component {
  render() {
    return (
      <React.Fragment>
        <div className = "bg-pic">
          <div className = "bg" id = "bg-goalProgress">
            <div className="container">
              <h1 class="welcome-msg">Welcome to InveStat, my name</h1>
              {/* add here the name of user later */}
              <p className = "welcome-msg-2">InveStat is a platform for you to track your investment goals and analyse how your current portfolio’s perform against your goal. It aims to help investors to gain a better understanding of their investment progress overtime, and how far they have achieved against their goals. </p>
              <p className = "welcome-msg-3">Click here and set your own investment goal now!</p>  
              <Link className="btn btn-primary" id = "setGoal-button" to="/goal-setting/set-goal">
                 Set Goal
              </Link>
            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default GoalProgressPage;



{/* <main className="container">
<Link className="btn btn-primary" to="/goal-setting/set-goal">
  Set Goal
</Link>
</main> */}
