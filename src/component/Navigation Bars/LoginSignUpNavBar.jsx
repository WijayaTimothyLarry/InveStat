import React, { Component } from "react";
import ReactDOM from "react-dom";
import WelcomePage from "../WelcomePage";

class LoginSignUpNavBar extends Component {
  render() {
    return (
      <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <a class="my-0 mr-md-auto font-weight-normal" href="#">
          InveStat
        </a>
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
      </div>
    );
  }
}

export default LoginSignUpNavBar;
