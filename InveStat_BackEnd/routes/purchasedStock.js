const express = require("express");
const router = express.Router();
const { purchasedStock } = require("../models"); 
const {transaction}= require("../models"); 
var Sequelize  = require('sequelize');



//get
router.get("/", updateValue, async(req, res) => {
  let currentPurchasedStock = await purchasedStock
  .findAll({ where: { portfolioId: req.body.portfolioId } })
  .catch((e) => {
    console.log(e.message);
  });
  res.json(currentPurchasedStock);
});

async function updateValue (req,res,next){
  
  
  let currentPurchasedStock = await purchasedStock.findAll({ 
    where: { portfolioId: req.body.portfolioId } })
    .catch((e) => {console.log(e.message);
    });
    

  const result = JSON.parse(JSON.stringify(currentPurchasedStock));

  result.forEach(async function(result) {
    var purchasedStockId = result.id;
    console.log(purchasedStockId);

    //get total amount
    let totalAmount = await transaction.findAll({
      where: { "purchasedStockId": purchasedStockId },
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('changeInQuantity')), 'changeInQuantity'],
      ],
      group: ['purchasedStockId'],
    }) .catch((e) => {
      console.log(e.message);
    });

    const totalAmountJson = JSON.parse(JSON.stringify(totalAmount));
    const totalAmountValue = parseInt(totalAmountJson[0]['changeInQuantity']);
    console.log('totalamount',totalAmountValue);
    
    
    //update value
    const updatedStock = await purchasedStock.update(
      { "totalQuantity": totalAmountValue},
      { where: {  "id": purchasedStockId} }
    ).catch(e => {
      console.log(e);
    });
    });
    next()
    };




//create
router.post("/", async (req, res) => {
  const purchasedStockInfo = req.body;
  
  await purchasedStock.create(purchasedStockInfo);
  res.json(purchasedStockInfo);
});


//delete
router.get("/delete", async function (req, res) {
  const reqBody = req.body;
  console.log(reqBody);
  let currentPurchasedStock = await purchasedStock
    .findOne({
      where: {
        id: reqBody.id,
      },
    })
    .catch((e) => {
      console.log(e.message);
    });
  if (!currentPurchasedStock) {
    console.log("err");
  }
  currentPurchasedStock.destroy();
  console.log("deleted");
  res.json("deleted");
});


//update total value
module.exports = router;