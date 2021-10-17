const express = require("express");
const router = express.Router();
const { transaction } = require("../models"); 
const { purchasedStock } = require("../models"); 

//get
router.get("/", async(req, res) => {
  const listOfTransactions = await transaction.findAll()
  res.json(listOfTransactions);
});



//create
router.post("/", createPStock, async (req, res) => {
  const transactionInfo = req.body;
  var changeInQuantity = transactionInfo.changeInQuantity;
  if (transactionInfo.transactionType=='Sell'){
      changeInQuantity = -1 * parseInt(transactionInfo.changeInQuantity);
      
  };
  TransactionDetail = await transaction.create({
    transactionType : transactionInfo.transactionType,
    changeInQuantity : changeInQuantity,
    transactionDate : transactionInfo.transactionDate,
    purchasedStockId : res.purchasedStockId,
    portfolioId : transactionInfo.portfolioId,
    TransactionPrice : transactionInfo.TransactionPrice,
    purchasedStockStockTickerId:transactionInfo.purchasedStockStockTickerId,
    brokerageCost : transactionInfo.brokerageCost
  });
  res.json(TransactionDetail);
});


async function createPStock (req,res,next){
  const purchasedStockInfo = req.body;
  const portfolioId = purchasedStockInfo.portfolioId;
  const stockTickerId = purchasedStockInfo.purchasedStockStockTickerId; 
  console.log(stockTickerId);
  var existingStock;
  try{
     existingStock = await purchasedStock
    .findOne({
      where: {
        portfolioId : portfolioId,
        stockTickerId : stockTickerId
      },
    }).catch((e) => {
      console.log(e.message);
    });
  }catch (err) {
    console.log('err');
  }

  if (existingStock=== null) {
    new_stock = await purchasedStock.create({
    "stockTickerId" :stockTickerId,
    "portfolioId" : portfolioId
  });

  res.purchasedStockId= new_stock.id;
  console.log('new stock created');
}
else{
  res.purchasedStockId= existingStock.id;
  console.log('existing stock exists');
}
  next()
}

module.exports = router;