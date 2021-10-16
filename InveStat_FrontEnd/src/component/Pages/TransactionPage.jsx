import React from "react";
import Joi from "joi-browser";
import Form from "./../common/form";

class TransactionPage extends Form {
  state = {
    data: {
      portfolioID: "",
      date: "",
      stockID: "",
      quantity: 0,
      price: 0,
      brokerCost: 0,
    },
    portfolioList: [
      { portfolioID: "asdfaf", name: "portfolio 1" },
      { portfolioID: "asdaf", name: "portfolio 2" },
    ],
    errors: {},
  };

  schema = {
    portfolioID: Joi.string().required(),
    date: Joi.string().required().label("Date"),
    stockID: Joi.string().required(),
    quantity: Joi.number().max(100).min(1).required(),
    price: Joi.number().min(0).required(),
    brokerCost: Joi.number().min(0).required(),
  };

  render() {
    return (
      <React.Fragment>
        <h1>Transaction</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderSelect(
            "portfolioID",
            "Portfolio",
            this.state.portfolioList
          )}
          {this.renderInput("date", "Date")}
          {this.renderInput("stockID", "Stock")}
          {this.renderInput("quantity", "Quatity", "number")}
          {this.renderInput("price", "Price", "number")}
          {this.renderInput("brokerCost", "Broker Cost", "number")}
          {this.renderButton("Submit")}
        </form>
      </React.Fragment>
    );
  }
}

export default TransactionPage;
