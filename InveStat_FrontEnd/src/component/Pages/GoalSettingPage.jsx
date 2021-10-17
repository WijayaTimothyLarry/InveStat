import Form from "../common/form";
import React from "react";
import Joi from "joi-browser";

class GoalSettingPage extends Form {
  state = {
    data: {
      initialValue: "",
      duration: "",
      additionalContribution: "",
      overallTarget: "",
      expectedReturnPerYear: "",
    },
    errors: {},
  };

  schema = {
    initialValue: Joi.string().required(),
    duration: Joi.number().required(),
    additionalContribution: Joi.number().required(),
    overallTarget: Joi.number().required(),
    expectedReturnPerYear: Joi.number().required(),
  };

  doSubmit() {
    console.log(this.state.data);
  }
  render() {
    return (
      <React.Fragment>
        <h1>Goal Setting</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput(
            "initialValue",
            "What is your current portfolio Value?"
          )}
          {this.renderInput(
            "duration",
            "How long will you continue to invest?"
          )}
          {this.renderInput(
            "additionalContribution",
            "How much can you invest every month?"
          )}
          {this.renderInput(
            "overallTarget",
            "How much do you want to have by end of your investment period?"
          )}
          {this.renderInput(
            "expectedReturnPerYear",
            "What is your target return per year?"
          )}
          {this.renderButton("Submit")}
        </form>
      </React.Fragment>
    );
  }
}

export default GoalSettingPage;
