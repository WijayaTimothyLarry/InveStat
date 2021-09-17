import React, { Component } from "react";
import ReactDOM from "react-dom";
import MainPage from "./MainPage";
import WelcomePage from "./WelcomePage";

class BarMenu extends React.Component {
  goToWelcomePage() {
    ReactDOM.render(<WelcomePage />, document.getElementById("root"));
  }
  render() {
    return (
      <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 class="my-0 mr-md-auto font-weight-normal">Portfolio Tracker</h5>
        <nav class="my-2 my-md-0 mr-md-3">
          <a class="p-2 text-dark" href="#">
            Features
          </a>
          <a class="p-2 text-dark" href="#">
            Enterprise
          </a>
          <a class="p-2 text-dark" href="#">
            Support
          </a>
          <a class="p-2 text-dark" href="#">
            Pricing
          </a>
        </nav>
        <a
          onClick={this.goToWelcomePage}
          class="btn btn-outline-primary"
          href="#"
        >
          Log Out
        </a>
      </div>
    );
  }
}

export default BarMenu;
