const express = require("express");
const router = express.Router();
const { purchasedStock } = require("../models"); 



router.get("/", async(req, res) => {
  let currentPurchasedStock = await purchasedStock
  .findAll({ where: { portfolioId: req.body.portfolioId } })
  .catch((e) => {
    console.log(e.message);
  });
  res.json(currentPurchasedStock);
});


router.post("/", async (req, res) => {
  const purchasedStockInfo = req.body;
  // console.log(purchasedStockInfo);
  // console.log(purchasedStockInfo.stockTickerId);
  // console.log(purchasedStockInfo.stockName);
  // console.log(purchasedStockInfo.totalQuantity);
  // console.log(purchasedStockInfo.avgPurchasePriceUsd);
  
  await purchasedStock.create(purchasedStockInfo);
  res.json(purchasedStockInfo);
});


module.exports = router;