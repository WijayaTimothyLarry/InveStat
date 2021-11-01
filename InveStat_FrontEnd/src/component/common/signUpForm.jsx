import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import * as userService from "../../services/userService";
import authService from "../../services/authService";

import "../../css/SignUpPage.css";
import logo from "../../logo/InveStatLogo2.png";

class SignUpForm extends Form {
  state = {
    data: { username: "", password: "", confirmPass: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    confirmPass: Joi.string().required(),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    //call the server
    if (this.state.data.password !== this.state.data.confirmPass) {
      const errors = { ...this.state.errors };
      errors.confirmPass = "Password and Confirm Password did not match";
      this.setState({ errors });
      return;
    }
    try {
      const { data } = this.state;
      const response = await userService.register(data);
      authService.loginWithJwt(response.data.token);
      window.location = "/main-page";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        console.log(errors);
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div id="bg-pic-signUpPage">
        <div id="bg-signUpPage">
          {/* CONTENT */}
          <div id="container-left-signUpPage">
            <div className="logoWrapper">
              <img src={logo} id="logo-signUpPage"></img>
              <h3 className="branding-msg">
                {" "}
                We provide simple, comprehensive and intuitive investment and
                portfolio solutions for both business and personal use.
              </h3>
            </div>
          </div>

          <div id="container-right-signUpPage">
            <div id="signUpFormBorder">
              <div id="signUpFormInner">
                {/* delete border laterfor login form wrapper, not in use */}
                {/* <div className="signUpFormWrapper"> */}
                <form clas onSubmit={this.handleSubmit}>
                  {this.renderInput("username", "Username")}
                  {this.renderInput("password", "Password", "password")}
                  {this.renderInput(
                    "confirmPass",
                    "Confirm Password",
                    "password"
                  )}
                  {this.renderInput("name", "Name")}
                  {this.renderButton("Sign Up", "signUpButton")}
                </form>
                <div className="alt-msg-SignUp">
                  Already have an account? <a href="/login">Log in</a> here.
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpForm;

{
  /* <div>
<h1>Sign Up</h1>
<form onSubmit={this.handleSubmit}>
  {this.renderInput("username", "Username")}
  {this.renderInput("password", "Password", "password")}
  {this.renderInput("confirmPass", "Confirm Password", "password")}
  {this.renderInput("name", "Name")}
  {this.renderButton("Sign Up")}
</form>
</div> */
}
