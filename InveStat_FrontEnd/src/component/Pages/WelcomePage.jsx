import React, { Component } from "react";
import ReactDOM from "react-dom";
import MainPage from "./MainPage";

class WelcomePage extends Component {
  goToMainPage() {
    ReactDOM.render(<MainPage />, document.getElementById("root"));
  }
  render() {
    return (
      <React.Fragment>
        <main className="container">
          <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 class="display-4">Welcome to InveStat</h1>
            <p class>
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
