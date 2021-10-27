import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import * as userService from "../../services/userService";
import authService from "../../services/authService";
class SignUpForm extends Form {
  state = {
    data: { username: "", password: "", confirmPass: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    confirmPass: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .options({ language: { any: { allowOnly: "must match password" } } })
      .label("Confirm Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    //call the server
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
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("confirmPass", "Confirm Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Sign Up")}
        </form>
      </div>
    );
  }
}

export default SignUpForm;
