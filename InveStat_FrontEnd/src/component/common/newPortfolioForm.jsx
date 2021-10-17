import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import portfolioControl from "../../controller class/MainPageController";

class NewPortfolioForm extends Form {
  state = {
    data: { portfolioName: "" },
    errors: {},
  };

  schema = {
    portfolioName: Joi.string().required().label("Portfolio Name"),
  };
  doSubmit = () => {
    //call the server
    console.log("submitted");
    const { data } = this.state;
    portfolioControl.addPortfolio({
      id: data.portfolioName,
      portfolioName: data.portfolioName,
      totalValue: 0,
      pnl: 0,
      ytdReturn: 0.0,
    });

    this.props.history.push("/main-page");
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
