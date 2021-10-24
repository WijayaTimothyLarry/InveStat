const express = require("express");
const router = express.Router();
const {  transaction, portfolio, purchasedStock } = require("../models");
var createPStock = require("../middleware/createStock");



//get //need to debug
router.get("/", async (req, res) => {

  const currentPurchasedStock = req.header('purchasedStockId');

  let listOfTransactions = await transaction.findAll({ 
        where: { purchasedStockId: currentPurchasedStock } })
        .catch((e) => {
          console.log(e.message);
        });
        if (!listOfTransactions) {
              res.json(listOfTransactions);
              };
});

//create
//create stock if it doesnt exist. //create transaction.
router.post("/",createPStock, async (req, res) => {

  const transactionInfo = req.body; 

  //quantity to add
  var changeInQuantity = transactionInfo.changeInQuantity;
  console.log(transactionInfo.brokerageCost);
  if (transactionInfo.transactionType == 'Sell') {
    changeInQuantity = -1 * parseInt(transactionInfo.changeInQuantity);
  };


  //check if current portfolio exists
  let currentPortfolio = await portfolio
      .findOne({ where: { id: transactionInfo.portfolioId } })
      .catch((e) => {
        console.log(e.message);
      });
    if (!currentPortfolio) {
      res.json("no current portfolio");
      return;
    };
    

  //check if current stock exists
  let currentStock = await purchasedStock
    .findOne({ where: { stockTickerId: transactionInfo.purchasedStockStockTickerId} })
    .catch((e) => {
      console.log(e.message);
    });
  if (!currentStock) {
    res.json("no current stock");
    return;
  };
  

  //total value
  const costPrice = changeInQuantity * transactionInfo.TransactionPrice;

  
  //add transaction detail
  let TransactionDetail = await transaction.create({
    transactionType: transactionInfo.transactionType,
    changeInQuantity: changeInQuantity,
    transactionDate: transactionInfo.transactionDate,
    purchasedStockId: res.purchasedStockId,
    portfolioId: transactionInfo.portfolioId,
    TransactionPrice: transactionInfo.TransactionPrice,
    purchasedStockStockTickerId: transactionInfo.purchasedStockStockTickerId,
    brokerageCost: transactionInfo.brokerageCost,
    costPrice : costPrice,

  }).catch((e) => {
    console.log(e.message);
  });


if(!TransactionDetail){
  console.log("Err");
}

res.json(TransactionDetail);

});



//update stock
router.put("/", async (req, res) => {


  //get current portfoio's purchasedStockStockTickerId's totalQuantity and avgValue
  const transactionInfo = req.body; 
  let currentStockInfo = await purchasedStock.findOne({
    where: {
      portfolioId: transactionInfo.portfolioId,
      stockTickerId :transactionInfo.purchasedStockStockTickerId
    },
    attributes:['stockTickerId','portfolioId','costPrice','totalQuantity','avgPurchasePriceUsd']
  })
  .catch((e) => {
    console.log(e.message);
  });
  if (!currentStockInfo) {
    res.json("no current stock");
    return;
  };

  const currentStockInfoJson = JSON.parse(JSON.stringify(currentStockInfo));
  const currentTotalQuantityValue = parseInt(currentStockInfoJson['totalQuantity']);
  const currentAvgPurchasePriceUsdValue = parseInt(currentStockInfoJson['avgPurchasePriceUsd']);
  
  //update  
  if (transactionInfo.transactionType == 'Buy') {

    //update total quantity
    changeInQuantity = parseInt(transactionInfo.changeInQuantity);
    const updatedTotalQuantityValue = currentTotalQuantityValue+changeInQuantity;
    
    //update avg price
    updatedAverageValue = ((currentTotalQuantityValue * currentAvgPurchasePriceUsdValue ) + (changeInQuantity * transactionInfo.TransactionPrice)) / (currentTotalQuantityValue+changeInQuantity);

    //make the update
    currentStockInfo.totalQuantity = updatedTotalQuantityValue;
    currentStockInfo.avgPurchasePriceUsd = updatedAverageValue;
    currentStockInfo.costPrice = updatedTotalQuantityValue*updatedAverageValue;
    await currentStockInfo.save();
    res.json(currentStockInfo);
    return;
  }
  else if (transactionInfo.transactionType == 'Sell'){

    //update total quantity
    changeInQuantity = -1 * parseInt(transactionInfo.changeInQuantity);
    const updatedTotalQuantityValue = currentTotalQuantityValue+changeInQuantity;

    //make the update
    currentStockInfo.totalQuantity = updatedTotalQuantityValue;
    currentStockInfo.costPrice = updatedTotalQuantityValue*updatedAverageValue;
    await currentStockInfo.save();
    res.json(currentStockInfo);
    return;

  }
  else{
    res.json("invalid transaction type, only Buy or Sell");
    return;
  }
        
});



module.exports = router;