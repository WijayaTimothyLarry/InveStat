const express = require("express");
const router = express.Router();
const { purchasedStock } = require("../models");
var auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const portfolioId = req.header("portfolioId");

  let currentPurchasedStock = await purchasedStock
    .findAll({
      where: {
        portfolioId: portfolioId,
      },
    })
    .catch((e) => {
      console.log(e.message);
    });

  res.json(currentPurchasedStock);
});

router.get("/all", auth, async (req, res) => {
  const userEmail = req.user.email;
  const listOfStocks = await purchasedStock.findAll({
    where: {
      userEmail: userEmail,
    },
  });
  if (listOfStocks === null) {
    console.log("Not found!");
  } else {
    res.json(listOfStocks);
  }
});

router.post("/", async (req, res) => {
  const purchasedStockInfo = req.body;

  await purchasedStock.create(purchasedStockInfo);
  res.json(purchasedStockInfo);
});

router.delete("/delete", async function (req, res) {
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
