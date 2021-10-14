import React, { Component } from "react";
import ReactDOM from "react-dom";
import MainPage from "./MainPage";
import logo from "../../logo/InveStatLogo.png";
class WelcomePage extends Component {
  goToMainPage() {
    ReactDOM.render(<MainPage />, document.getElementById("root"));
  }
  render() {
    return (
      <React.Fragment>
        <main className="container">
          <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 className="display-4">Welcome to </h1>
            <img className="logo" src={logo} width="500" height="193" />
            <p className>
              InveStat is equipped with goal setting feature that will help you
              staying on track to your financial goals.
            </p>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default WelcomePage;
