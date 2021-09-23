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
        <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <h5 class="my-0 mr-md-auto font-weight-normal">InveStat</h5>
          <nav class="my-2 my-md-0 mr-md-3"></nav>
          <a class="btn btn-outline-primary" href="#">
            Sign up
          </a>
          <a
            onClick={this.goToMainPage}
            className="ml-2 btn btn-outline-primary"
            href="#"
          >
            Login
          </a>
        </div>
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
