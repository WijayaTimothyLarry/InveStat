import Form from "../common/form";
import React from "react";
import Joi from "joi-browser";
import goalsettingService from "../../services/goalsettingService";

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

  async doSubmit() {
    console.log(this.state.data);
    const { data } = this.state;
    const res = await goalsettingService.setGoal(data);
    console.log(res);
  }

  calcFV() {
    const { data } = this.state;
    let FV =
      data.initialValue *
        (1 + data.expectedReturnPerYear / 100) ** data.duration +
      (data.additionalContribution *
        ((1 + data.expectedReturnPerYear / 100) ** data.duration - 1)) /
        (data.expectedReturnPerYear / 100);

    if (FV) return FV.toFixed(2);
    else return 0;
  }
  render() {
    return (
      <React.Fragment>
        <h1>Goal Setting</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput(
            "initialValue",
            "What is your current holdings' value?"
          )}
          {this.renderInput(
            "duration",
            "How long will you continue to invest?"
          )}
          {this.renderInput(
            "additionalContribution",
            "How much can you invest every year?"
          )}
          {this.renderInput(
            "expectedReturnPerYear",
            "What is your target % return per year?"
          )}
          {this.renderInput(
            "overallTarget",
            "How much do you want to have by end of your investment period?"
          )}
          <h3 className="FV warning mb-100">
            by our calculation you will have $ {this.calcFV()} by the end of
            your investing period
          </h3>
          {this.renderButton("Submit")}
        </form>
      </React.Fragment>
    );
  }
}

export default GoalSettingPage;
