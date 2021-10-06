const express = require("express");
const router = express.Router();
const { portfolio } = require("../models"); 

router.get("/", async(req, res) => {
  const listOfPortfolio = await portfolio.findAll()
  res.json(listOfPortfolio);
});

router.post("/", async(req, res) => {
  const portfolioInfo = req.body;
  console.log(portfolioInfo.portfolioName);
  console.log(portfolioInfo.totalValue);
  await Portfolio.create(portfolioInfo);  
  res.json(portfolioInfo);
})

module.exports = router;