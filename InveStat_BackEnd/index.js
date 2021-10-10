const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const db = require("./models");

const app = express();
app.use(express.json());
app.use(cors());

// Routers
const signUpRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const portfolioRouter = require("./routes/portfolio");
const transactionRouter = require("./routes/transaction");
const purchasedStocksRouter = require("./routes/purchasedStock");

app.use("/api/users", signUpRouter);
app.use("/api/login", loginRouter);
app.use("/api/portfolio", portfolioRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/purchasedStock", purchasedStocksRouter);

db.sequelize.sync().then(() => {
  app.listen(3900, () => {
    console.log("running server on 3900");
  });
});
