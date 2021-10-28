const express = require("express");
const router = express.Router();
const {
  portfolioHistory
} = require("../models");
var auth = require("../middleware/auth");


//get portfolioHistory by portfolioId
router.get("/", async (req, res) => {
  const currentUserEmail = req.body.userEmail;

  const currentPortfolioHistory = await portfolioHistory.findAll({
    where: {
      userEmail: currentUserEmail
    },
  });
  if (currentPortfolioHistory === null) {
    console.log("Not found!");
  } else {
    res.json(currentPortfolioHistory);
  }
});


//create
router.post("/", async (req, res) => {
  const portfolioHistoryInfo = req.body;

    let insertedPortfolioHistory = await portfolioHistory.create(portfolioHistoryInfo).catch((e) => {
      console.log(e.message);
      return;
    });
    if (!insertedPortfolioHistory) {
      res.json({"message":"unable to insert"});
    }
    else{
      res.json(portfolioHistoryInfo);
    }

});


//update
router.put("/", async function (req, res) {

  //get current total value
  const portfolioHistoryInfo = req.body;

  let currentPortfolioHistory = await portfolioHistory.findOne({
      where: {
        date: portfolioHistoryInfo.date,
        portfolioId: portfolioHistoryInfo.portfolioId,
        userEmail: portfolioHistoryInfo.userEmail
      },
      attributes: ['id', 'date','portfolioId', 'totalValue']
    })
    .catch((e) => {
      console.log(e.message);
    });
  if (!currentPortfolioHistory) {
    res.json("no current portfolio history");
    return;
  };

  //update total Value with req's total value
  const updatedTotalValue = portfolioHistoryInfo.totalValue;
  currentPortfolioHistory.totalValue = updatedTotalValue;

  await currentPortfolioHistory.save();
  res.json(currentPortfolioHistory);
  return;

});


module.exports = router;