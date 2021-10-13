const express = require("express");
const router = express.Router();
const { purchasedStock } = require("../models"); 


router.get("/", async(req, res) => {

  console.log(req.body);
  const reqInfo = req.body
  const portfolioId = reqInfo.portfolioId
  const listOfPurchasedStocks = await purchasedStock.findAll({ where: { portfolioPortfolioId: portfolioId} });
  res.json(listOfPurchasedStocks);
});


router.post("/", async(req, res) => {
  const stockInfo = req.body;

  await purchasedStock.create(stockInfo);  
  res.json(stockInfo);

})


module.exports = router;