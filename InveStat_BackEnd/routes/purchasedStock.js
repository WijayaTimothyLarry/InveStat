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
  // console.log(currentPurchasedStock);
  res.json(currentPurchasedStock);
});

async function updateValue (req,res,next){
  
  
  let currentPurchasedStock = await purchasedStock
  .findAll({ where: { portfolioId: req.body.portfolioId } })
  .catch((e) => {
    console.log(e.message);
  });
  
  const result = JSON.parse(JSON.stringify(currentPurchasedStock));

  //iterate through each stock
  console.log(result.stockTickerId);
  result.forEach(async function(result) {
    var purchasedStockId = result.id;

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


    //update value
    purchasedStock.update(
      { "totalQuantity": totalAmountValue},
      { where: {  "id": purchasedStockId } }
    ).catch(e => {
      console.log(e);
  });
    console.log('success')
      

  });

  next()
    };








//   for(data in currentPurchasedStock.portfolioId){
//     console.log("PiD",data);
// }
  // console.log(existingStock);
  // if (existingStock=== null) {
  //     console.log('no existing stock exists')
  //   }
  // else{
  //   for (var i = 1; i <= numbers; i++) {
  //     if(i>3)
  //     break;
  //      lol +=  word + " ";
  //   }

  //   const totalAmount = await DONATIONS.findAll({
  //     attributes: [
  //       'member_id',
  //       [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
  //     ],
  //     group: ['member_id'],
  //   });
  //   }
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