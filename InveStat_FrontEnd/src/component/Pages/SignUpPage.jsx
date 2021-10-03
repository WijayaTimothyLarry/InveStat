import React, { Component } from "react";
import LoginSignUpNavBar from "./Navigation Bars/LoginSignUpNavBar";

class SignUpPage extends Component {
  render() {
    return (
      <React.Fragment>
        <LoginSignUpNavBar />
        <main className="main-body container">
          <form class="form-signin">
            <h1 class="h3 mb-3 font-weight-normal">Please log in</h1>
            <label for="inputEmail" class="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="inputEmail"
              class="form-control"
              placeholder="Email address"
              required
              autofocus
            />
            <label for="inputPassword" class="sr-only">
              Password
            </label>
            <input
              type="password"
              id="inputPassword"
              className="form-control mt-1"
              placeholder="Password"
              required
            />
            <label for="re-inputPassword" class="sr-only">
              Password
            </label>
            <input
              type="password"
              id="re-inputPassword"
              className="form-control mt-1"
              placeholder="Re-input Password"
              required
            />
            <div className="mt-3">
              <a className="newUser" href="#">
                already have an account?
              </a>
              <button
                className="signUp-btn btn btn-md btn-outline-primary m-3 "
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </main>
      </React.Fragment>
    );
  }
}

export default SignUpPage;