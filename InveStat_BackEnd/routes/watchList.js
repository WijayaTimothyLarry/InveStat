const express = require("express");
const router = express.Router();
const { watchlistStocks } = require("../models"); 

router.get("/", async(req, res) => {
  const listOfTransactions = await transaction.findAll()
  res.json(listOfTransactions);
});


//setWatchlistStock()
//removeStockFromWatchList()


module.exports = router;