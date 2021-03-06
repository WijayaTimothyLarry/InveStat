import React from "react";
import Joi from "joi-browser";
import auth from "../../services/authService";
import portfolioService from "../../services/portfolioService";
import { getStockList } from "../../services/watchlistService";
import transactionService from "../../services/transactionService";
import CustomSelect from "./../common/customSelect";
import DateSelect from "../common/selectDate";
import Form from "./../common/form";
import "../../css/transactionPage.css";

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
      userEmail: "",
    },
    portfolioList: [],
    stockList: [],
    errors: {},
  };

  schema = {
    id: Joi.string().required().label("Portfolio"),
    rawdate: Joi.label("rawDate"),
    transactionDate: Joi.string().required().label("Date"),
    transactionType: Joi.string().required().label("Transaction Type"),
    purchasedStockStockTickerId: Joi.string().required().label("Stock"),
    changeInQuantity: Joi.number()
      .max(1000)
      .min(1)
      .required()
      .label("Quantity"),
    TransactionPrice: Joi.number().min(0).required().label("Price"),
    brokerageCost: Joi.number().min(0).required().label("Broker Cost"),
    userEmail: Joi.string(),
  };

  async componentDidMount() {
    auth.checkExpiry();
    const rawStockList = await getStockList();
    const stockList = rawStockList.map((s) => {
      return { value: s.symbol, label: s.symbol + "   |   " + s.name };
    });

    const portfolios = await portfolioService.getPortfolioList(auth.getJwt());

    console.log(portfolios);
    const portfolioList = portfolios.map((p) => {
      return { id: p.id, name: p.portfolioName };
    });

    const date = new Date();
    const { data } = this.state;
    data["rawdate"] = date;
    data["transactionDate"] = `${(date.getYear() % 100) + 2000}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    data.userEmail = auth.getCurrentUserEmail();
    this.setState({
      portfolioList,
      stockList,
      data,
    });
    console.log(this.state);
  }

  async doSubmit() {
    try {
      const { data } = this.state;
      await transactionService.addTransaction(data);
      await portfolioService.updatePortfolio(data.id);

      window.location = "/";
    } catch (ex) {
      console.log(ex);
    }
  }

  handleDateChange = (date) => {
    const data = { ...this.state.data };
    console.log(this.validate());
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
        <div id="container-transactionPage">
          <div id="newTranctWrapper">
            <p id="newTranct-msg">Add Transaction</p>

            <div id="newTranctFormWrapper">
              <form onSubmit={this.handleSubmit}>
                <div id="dateWrapper-Tranct">
                  <div id="dateWrapper-TranctLeft"> Date*</div>
                  <div id="dateWrapper-TranctRight">
                    {this.renderDateSelect(
                      "rawdate",
                      "transactionDate*",
                      "Date*"
                    )}
                  </div>
                </div>
                {this.renderSelect("transactionType", "Transaction Type*", [
                  { id: "Buy", name: "Buy" },
                  { id: "Sell", name: "Sell" },
                ])}
                {this.renderSelect(
                  "id",
                  "Portfolio*",
                  this.state.portfolioList
                )}
                {this.renderCustomSelect(
                  "purchasedStockStockTickerId",
                  "Stock*",
                  this.state.stockList
                )}
                {this.renderInput("changeInQuantity", "Quatity*", "number")}
                {this.renderInput("TransactionPrice", "Price*", "number")}
                {this.renderInput("brokerageCost", "Broker Cost", "number")}
                <p>* input is required, else not allowed to submit</p>
                {this.renderButton("Submit", "doneButton-newTranct")}
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TransactionPage;
