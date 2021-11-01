import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "./form";
import auth from "../../services/authService";
import "../../css/LoginPage.css";
import logo from "../../logo/InveStatLogo2.png";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    //call the server
    try {
      const { data } = this.state;
      const { data: resData } = await auth.login(data.username, data.password);
      console.log(resData);
      if (resData.auth) window.location = "/main-page";
      else {
        const errors = { ...this.state.errors };
        errors.password = resData.message;
        this.setState({ errors });
      }
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
      <div id="bg-pic-loginPage">
        <div id="bg-loginPage">
          {/* CONTENT */}
          <div id="container-left-loginPage">
            <div className="logoWrapper" id="logoWrapper-loginPage">
              <img src={logo} className="logo-loginPage"></img>
              <h3 className="branding-msg-loginPage">
                {" "}
                We provide simple, comprehensive and intuitive investment and
                portfolio solutions for both business and personal use.
              </h3>
            </div>
          </div>

          <div id="container-right-loginPage">
            <div id="loginFormWrapper">
              {/* delete border laterfor login form wrapper, not in use */}
              {/* <div className="loginFormnWrapper" id = "loginFormWrapper"> */}
              <form clas onSubmit={this.handleSubmit}>
                {this.renderInput("username", "Username: ")}
                {this.renderInput("password", "Password: ", "password")}
                {this.renderButton("Login", "loginButton")}
              </form>

              <div className="alt-msg-Login">
                Have not registered yet? <a href="/signup">Sign Up</a> here.
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// end of program

export default LoginForm;
