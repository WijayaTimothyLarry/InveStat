import React from "react";
import Joi from "joi-browser";
import DateSelect from "../common/selectDate";
import Form from "./../common/form";
import portfolioService from "../../services/portfolioService";
import auth from "../../services/authService";
import { getStockList } from "../../services/watchlistService";
import transactionService from "../../services/transactionService";
import CustomSelect from "./../common/customSelect";
import { join } from "lodash";
class TransactionPage extends Form {
  state = {
    data: {
      id: "",
      rawdate: "",
      transactionDate: "",
      transactionType: "",
      purchasedStockStockTickerId: "",
      changeInQuantity: 0,
      TransactionPrice: 0,
      brokerageCost: 0,
    },
    portfolioList: [],
    stockList: [],
    errors: {},
  };

  async componentDidMount() {
    const stockList = getStockList().map((s) => {
      return { value: s.Code, label: s.Code + "   |   " + s.Name };
    });

    const { data: portfolios } = await portfolioService.getPortfolioList(
      auth.getJwt()
    );
    const portfolioList = portfolios.map((p) => {
      return { id: p.id, name: p.portfolioName };
    });

    const { data } = this.state;
    data["rawdate"] = new Date();
    this.setState({
      portfolioList,
      stockList,
      data,
    });
  }

  schema = {
    id: Joi.string().required().label("Portfolio"),
    rawdate: Joi.label("rawDate"),
    transactionDate: Joi.string().required().label("Date"),
    transactionType: Joi.string().required().label("Transaction Type"),
    purchasedStockStockTickerId: Joi.string().required().label("Stock"),
    changeInQuantity: Joi.number().max(100).min(1).required().label("Quantity"),
    TransactionPrice: Joi.number().min(0).required().label("Price"),
    brokerageCost: Joi.number().min(0).required().label("Brocker Cost"),
  };

  async doSubmit() {
    const { data } = this.state;
    const res = await transactionService.addTransaction(data);
    window.location = "/";
  }

  handleDateChange = (date) => {
    const data = { ...this.state.data };
    data["rawdate"] = date;
    if (date) {
      data["transactionDate"] = `${(date.getYear() % 100) + 2000}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
    } else {
      data["transactionDate"] = "";
    }
    this.setState({ data });
  };

  renderDateSelect(name, name2, label) {
    const { data, errors } = this.state;
    return (
      <DateSelect
        name={name}
        label={label}
        selected={data[name]}
        dateFormat="dd-MM-yyyy"
        onChange={this.handleDateChange}
        error={errors[name2]}
      />
    );
  }

  renderCustomSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <CustomSelect
        name={name}
        data-value={data[name]}
        label={label}
        options={options}
        onChange={this.handleCustomSelectChange}
        error={errors[name]}
      />
    );
  }

  handleCustomSelectChange = (value) => {
    const data = { ...this.state.data };
    data["purchasedStockStockTickerId"] = value.value;
    this.setState({ data });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Transaction</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderDateSelect("rawdate", "transactionDate", "Date")}
          {this.renderSelect("transactionType", "Transaction Type", [
            { id: "buy", name: "Buy" },
            { id: "sell", name: "Sell" },
          ])}
          {this.renderSelect("id", "Portfolio", this.state.portfolioList)}
          {this.renderCustomSelect(
            "purchasedStockStockTickerId",
            "Stock",
            this.state.stockList
          )}
          {this.renderInput("changeInQuantity", "Quatity", "number")}
          {this.renderInput("TransactionPrice", "Price", "number")}
          {this.renderInput("brokerageCost", "Broker Cost", "number")}
          {this.renderButton("Submit")}
        </form>
      </React.Fragment>
    );
  }
}

export default TransactionPage;
