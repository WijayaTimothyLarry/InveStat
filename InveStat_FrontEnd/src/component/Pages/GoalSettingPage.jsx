import Form from "../common/form";
import React from "react";
import Joi from "joi-browser";
import "../../Images/bg2.png";
import "../../css/GoalSettingPage.css";
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
    this.props.history.push("/goal-setting");
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
        <div id="bg-pic-goalSetting">
          <div id="bg-goalSetting">
            <div id="container-goalSetting">
              {/* <h1 class="welcome-msg">Welcome to InveStat, my name</h1> */}
              {/* add here the name of user later */}
              {/* <p className = "welcome-msg-2">InveStat is a platform for you to track your investment goals and analyse how your current portfolio’s perform against your goal. It aims to help investors to gain a better understanding of their investment progress overtime, and how far they have achieved against their goals. </p> */}
              {/* <p className = "welcome-msg-3">Click here and set your own investment goal now!</p>   */}
              <h1 className="set-goal-form-header">
                Set your Investment Goals
              </h1>
              <div id="form_container-goalSetting">
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
                  <h3 className="goal-calculation-msg">
                    By our calculation, you will have $<u>{this.calcFV()}</u> by
                    the end of your investing period. All fields are required to
                    be filled, else not allowed to submit.
                  </h3>
                  {this.renderButton("Submit", "submitButton-GoalSettingPage")}
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* <h1>Goal Setting</h1>
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
        </form> */}
      </React.Fragment>
    );
  }
}

export default GoalSettingPage;

// <h1>Goal Setting</h1>
// <form onSubmit={this.handleSubmit}>
//   {this.renderInput(
//     "initialValue",
//     "What is your current portfolio Value?"
//   )}
//   {this.renderInput(
//     "duration",
//     "How long will you continue to invest?"
//   )}
//   {this.renderInput(
//     "additionalContribution",
//     "How much can you invest every month?"
//   )}
//   {this.renderInput(
//     "overallTarget",
//     "How much do you want to have by end of your investment period?"
//   )}
//   {this.renderInput(
//     "expectedReturnPerYear",
//     "What is your target return per year?"
//   )}
//   {this.renderButton("Submit")}
// </form>
