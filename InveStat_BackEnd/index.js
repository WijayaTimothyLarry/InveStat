const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const db = require("./models");
const app = express();

require('dotenv').config();
app.use(express.json());
app.use(cors());

// const PORT = process.env.PORT || 3001;

// Routers
const signUpRouter = require("./routes/signup");
const loginRouter= require("./routes/login");
const portfolioRouter = require("./routes/portfolio");
const transactionRouter = require("./routes/transaction");
const purchasedStocksRouter = require("./routes/purchasedStock");
const goalSettingRouter = require("./routes/goalSetting");
const watchlistRouter = require("./routes/watchList");
const portfolioHistoryRouter = require("./routes/portfolioHistory");

app.use("/users", signUpRouter);
app.use("/userlogin", loginRouter);
app.use("/portfolio", portfolioRouter);
app.use("/portfolioHistory", portfolioHistoryRouter);
app.use("/transaction", transactionRouter);
app.use("/purchasedStock", purchasedStocksRouter);
app.use("/goalsetting", goalSettingRouter);
app.use("/watchlist", watchlistRouter);


db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("running server on 3001");
  });
});
