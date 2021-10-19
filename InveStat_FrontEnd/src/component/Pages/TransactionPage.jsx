import React from "react";
import Joi from "joi-browser";
import DateSelect from "../common/selectDate";
import Form from "./../common/form";
import portfolioService from "../../services/portfolioService";
import auth from "../../services/authService";
import { getStockList } from "../../services/watchlistService";
import CustomSelect from "./../common/customSelect";
import { join } from "lodash";
class TransactionPage extends Form {
  state = {
    data: {
      id: "",
      rawdate: "",
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
    const rawStockList = getStockList();
    const stockList = rawStockList
      .filter((s) => {
        return (
          s.Type === "Common Stock" &&
          (s.Exchange === "NASDAQ" || s.Exchange === "NYSE")
        );
      })
      .map((s) => {
        return { value: s.Code, label: s.Name };
      });

    const { data } = await portfolioService.getPortfolioList(auth.getJwt());
    console.log(data);
    const portfolioList = data.map((p) => {
      return { id: p.id, name: p.portfolioName };
    });

    this.setState({
      portfolioList,
      stockList,
    });
  }

  schema = {
    id: Joi.string().required().label("Portfolio"),
    rawdate: Joi.label("rawDate"),
    date: Joi.string().required().label("Date"),
    stockID: Joi.string().required().label("Stock"),
    quantity: Joi.number().max(100).min(1).required().label("Quantity"),
    price: Joi.number().min(0).required().label("Price"),
    brokerCost: Joi.number().min(0).required().label("Brocker Cost"),
  };

  doSubmit() {
    const { data } = this.state;
    console.log(data);
  }

  handleDateChange = (date) => {
    console.log(date);
    const data = { ...this.state.data };
    data["rawdate"] = date;
    if (date) {
      data["date"] = `${(date.getYear() % 100) + 2000}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
    } else {
      data["date"] = "";
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
        dateFormat="dd/MM/yyyy"
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
        onChange={this.handleCustomSelectChane}
        error={errors[name]}
      />
    );
  }

  handleCustomSelectChane = (value) => {
    console.log(value);
    const data = { ...this.state.data };
    data["stockID"] = value.value;
    this.setState({ data });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Transaction</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderDateSelect("rawdate", "date", "Date")}
          {this.renderSelect("id", "Portfolio", this.state.portfolioList)}
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
