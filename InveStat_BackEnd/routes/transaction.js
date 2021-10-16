const express = require("express");
const router = express.Router();
const { transaction } = require("../models"); 


router.get("/", async(req, res) => {
  const listOfTransactions = await transaction.findAll()
  res.json(listOfTransactions);
});

router.post("/", async (req, res) => {
  const transactionInfo = req.body;
  console.log(transactionInfo);
  console.log(transactionInfo.transactionId);
  console.log(transactionInfo.transactionType);
  console.log(transactionInfo.TransactionPrice);
  console.log(transactionInfo.changeInQuantity);
  console.log(transactionInfo.transactionDate);
  // Error: portfolioPortfolioId and purchasedStockStockTickerId not showing up in sql DB
  // ^This is because portfolioPortfolioId and purchasedStockStockTickerId not initialized in their main table

  await transaction.create(transactionInfo);
  res.json(transactionInfo);
});

module.exports = router;