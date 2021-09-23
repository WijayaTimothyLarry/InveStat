import React, { Component } from "react";
import ReactDOM from "react-dom";
import WelcomePage from "../WelcomePage";

class NavBar extends Component {
  goToWelcomePage() {
    ReactDOM.render(<WelcomePage />, document.getElementById("root"));
  }
  render() {
    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 className="my-0 mr-md-auto font-weight-normal">Investat</h5>
        <nav className="my-2 my-md-0 mr-md-3">
          <a className="p-2 text-dark" href="#">
            Features
          </a>
          <a className="p-2 text-dark" href="#">
            Enterprise
          </a>
          <a className="p-2 text-dark" href="#">
            Support
          </a>
          <a className="p-2 text-dark" href="#">
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

export default NavBar;
