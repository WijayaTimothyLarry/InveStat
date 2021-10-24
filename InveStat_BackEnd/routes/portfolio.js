const express = require("express");
const router = express.Router();
const { portfolio, purchasedStock } = require("../models");
var auth = require("../middleware/auth");
const { parse: uuidParse } = require("uuid");
var Sequelize = require('sequelize');


router.get("/", auth, async (req, res) => {
  const userEmail = req.user.email;
  const listOfPortfolio = await portfolio.findAll({
    where: { userEmail: userEmail },
  });
  if (listOfPortfolio === null) {
    console.log("Not found!");
  } else {
    res.json(listOfPortfolio);
  }
});


router.post("/", async (req, res) => {
  const portfolioInfo = req.body;
  await portfolio.create(portfolioInfo);
  res.json(portfolioInfo);
});



router.delete("/delete", auth, async function (req, res) {
  const reqBody = req.body;
  console.log(reqBody);
  let currentPortfolio = await portfolio
    .findOne({
      where: {
        id: reqBody.id,
      },
    })
    .catch((e) => {
      console.log(e.message);
    });
  if (!currentPortfolio) {
    console.log("err");
  }
  currentPortfolio.destroy();
  console.log("deleted");
  res.json("deleted");
});


//update
router.put("/", auth, async function (req, res) {

  //get current total value
  const portfolioInfo = req.body; 
  console.log(portfolioInfo.portfolioId);
  let currentPortfolio = await portfolio.findOne({
    where: {
      id: portfolioInfo.portfolioId,
    },
    attributes:['id','costPrice']
  })
  .catch((e) => {
    console.log(e.message);
  });
  if (!currentPortfolio) {
    res.json("no current portfolio");
    return;
  };
  
  //add total value of stocks in the portfolio
  let totalCostPrice = await purchasedStock.findAll({
    where: {
        "portfolioId": portfolioInfo.portfolioId,
    },
    attributes: [
        [Sequelize.fn('sum', Sequelize.col('costPrice')), 'costPrice'],
    ],
    group: ['portfolioId'],
}).catch((e) => {
    console.log(e.message);
});
const totalCostPriceJson = JSON.parse(JSON.stringify(totalCostPrice));
console.log('totalCostPriceJsonPrint',totalCostPriceJson);

try{
  totalCostPriceValue = parseInt(totalCostPriceJson[0]['costPrice']);
}
catch{
  totalCostPriceValue=0;
}

 //make the update
 console.log('currentTotalValue',totalCostPriceValue);
 currentPortfolio.costPrice = totalCostPriceValue;
 await currentPortfolio.save();
 res.json(currentPortfolio);
 return;

});


//change portfolioname
module.exports = router;
