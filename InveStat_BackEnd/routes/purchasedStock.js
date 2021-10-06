const express = require("express");
const router = express.Router();
const { purchasedStock } = require("../models"); 

router.get("/", async(req, res) => {
  const ListOfPurchasedStocks = await purchasedStock.findAll()
  res.json(ListOfPurchasedStocks);
});


module.exports = router;