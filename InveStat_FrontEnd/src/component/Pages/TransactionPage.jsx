import React from "react";
import Joi from "joi-browser";
import Form from "./../common/form";
import portfolioService from "../../services/portfolioService";
import auth from "../../services/authService";
import { getStockList } from "../../services/watchlistService";
class TransactionPage extends Form {
  state = {
    data: {
      id: "",
      date: "",
      stockID: "",
      quantity: 0,
      price: 0,
      brokerCost: 0,
    },
    portfolioList: [],
    stockList: [],
    errors: {},
  };

  async componentDidMount() {
    const { data } = await portfolioService.getPortfolioList(auth.getJwt());
    const portfolioList = data.map((p) => {
      return { id: p.id, name: p.portfolioName };
    });
    const rawStockList = getStockList();
    const stockList = rawStockList.slice(0, 10000).map((s) => {
      return { value: s.Code, label: s.Name };
    });
    this.setState({
      portfolioList,
      stockList,
    });
  }

  schema = {
    id: Joi.string().required(),
    date: Joi.string().required().label("Date"),
    stockID: Joi.string().required(),
    quantity: Joi.number().max(100).min(1).required(),
    price: Joi.number().min(0).required(),
    brokerCost: Joi.number().min(0).required(),
  };

  doSubmit() {
    console.log(this.state.data);
  }

  render() {
    return (
      <React.Fragment>
        <h1>Transaction</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderSelect("id", "Portfolio", this.state.portfolioList)}
          {this.renderInput("date", "Date")}
          {this.renderCustomSelect("stockID", "Stock", this.state.stockList)}
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
