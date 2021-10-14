const express = require("express");
const router = express.Router();
const { purchasedStock } = require("../models"); 

router.get("/", async(req, res) => {
  const ListOfPurchasedStocks = await purchasedStock.findAll()
  res.json(ListOfPurchasedStocks);
});

router.post("/", async (req, res) => {
  const purchasedStockInfo = req.body;
  console.log(purchasedStockInfo);
  console.log(purchasedStockInfo.stockTickerId);
  console.log(purchasedStockInfo.stockName);
  console.log(purchasedStockInfo.totalQuantity);
  console.log(purchasedStockInfo.avgPurchasePriceUsd);
  // avgPurchasedPriceUsd = (transactionPrice * changeInQuantity * exchangeRate)/totalQuantity
  // calculation method not yet set up
  console.log(purchasedStockInfo.exchangeRate);
  console.log(purchasedStockInfo.portfolioPortfolioId);
  // foreign key issue not resolved
  
  await purchasedStock.create(purchasedStockInfo);
  res.json(purchasedStockInfo);
});


module.exports = router;