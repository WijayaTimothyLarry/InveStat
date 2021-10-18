const express = require("express");
const router = express.Router();
const {purchasedStock} = require("../models");
var updateValue = require("../middleware/updatePurchasedStockValue");


//get
router.get("/", updateValue, async (req, res) => {
  let currentPurchasedStock = await purchasedStock
    .findAll({
      where: {
        portfolioId: req.body.portfolioId
      }
    })
    .catch((e) => {
      console.log(e.message);
    });
  let currentPurchasedStock2 =  await purchasedStock
    .findAll({
      where: {
        portfolioId: req.body.portfolioId
      }
    })
    .catch((e) => {
      console.log(e.message);
    });

    res.json(currentPurchasedStock2);
});

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



module.exports = router;