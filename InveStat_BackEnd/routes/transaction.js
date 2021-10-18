const express = require("express");
const router = express.Router();
const {
  transaction
} = require("../models");
var createPStock = require("../middleware/createStock");



//get
router.get("/", async (req, res) => {
  const listOfTransactions = await transaction.findAll()
  res.json(listOfTransactions);
});



//create
router.post("/", createPStock, async (req, res) => {
  const transactionInfo = req.body;
  var changeInQuantity = transactionInfo.changeInQuantity;
  console.log(transactionInfo.brokerageCost);
  if (transactionInfo.transactionType == 'Sell') {
    changeInQuantity = -1 * parseInt(transactionInfo.changeInQuantity);

  };
  TransactionDetail = await transaction.create({
    transactionType: transactionInfo.transactionType,
    changeInQuantity: changeInQuantity,
    transactionDate: transactionInfo.transactionDate,
    purchasedStockId: res.purchasedStockId,
    portfolioId: transactionInfo.portfolioId,
    TransactionPrice: transactionInfo.TransactionPrice,
    purchasedStockStockTickerId: transactionInfo.purchasedStockStockTickerId,
    brokerageCost: transactionInfo.brokerageCost
  });
  res.json(TransactionDetail);
});




module.exports = router;