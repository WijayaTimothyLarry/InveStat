const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const db = require("./models");
const app = express();

require('dotenv').config();
app.use(express.json());
app.use(cors());

// Routers
const signUpRouter = require("./routes/signup");
const loginRouter= require("./routes/login");
const portfolioRouter = require("./routes/portfolio");
const transactionRouter = require("./routes/transaction");
const purchasedStocksRouter = require("./routes/purchasedStock");

app.use("/users", signUpRouter);
app.use("/userlogin", loginRouter);
app.use("/portfolio", portfolioRouter);
app.use("/transaction", transactionRouter);
app.use("/purchasedStock", purchasedStocksRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("running server on 3001");
  });
});
