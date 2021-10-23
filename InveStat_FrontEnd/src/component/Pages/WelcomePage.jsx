import React, { Component } from "react";
import ReactDOM from "react-dom";
import MainPage from "./MainPage";
import "../../css/WelcomePage.css";
import "../../Images/bg2.png"
import logo from "../../logo/InveStatLogo2.png";

class WelcomePage extends Component {
  goToMainPage() {
    ReactDOM.render(<MainPage />, document.getElementById("root"));
  }
  render() {
    return (
      // <React.Fragment>
        <div className = "bg-pic">
          <div className = "bg">
            <main className="container">
              <div class="pricing-header px-3 py-3 pt-md-10 pb-md-4 mx-auto text-center">
                <h1 class="welcome-msg">Welcome to</h1>
                  <img src = {logo} className="logo"></img>
                  <div className = "text">
                    InveStat is equipped with goal setting feature that will help you
                    staying on track to your financial goals.
                  </div>

                  <div>
                    <button className="login"><a href="/login"> Login</a></button>
                    <button className="signup"><a href="/signup">Sign Up</a></button>
                  </div>

              </div>
            </main>

          </div>
        </div>
      // </React.Fragment>
    );
  }
}

export default WelcomePage;
