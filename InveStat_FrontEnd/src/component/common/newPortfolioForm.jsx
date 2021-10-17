import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import portfolioService from "../../services/portfolioService";
import authService from "../../services/authService";
class NewPortfolioForm extends Form {
  state = {
    data: { portfolioName: "" },
    errors: {},
  };

  schema = {
    portfolioName: Joi.string().required().label("Portfolio Name"),
  };

  doSubmit = async () => {
    //call the server
    console.log("submitted");
    try {
      const { portfolioName } = this.state.data;
      const email = authService.getCurrentUserEmail();
      console.log({ email, portfolioName });
      await portfolioService.addNewPortfolio(email, portfolioName);
      window.location = "/main-page";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.portfolioName = ex.response.data;
        console.log(errors);
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div>
        <h1>New Portfolio</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("portfolioName", "Portfolio Name")}
          {this.renderButton("Done")}
        </form>
      </div>
    );
  }
}

export default NewPortfolioForm;
