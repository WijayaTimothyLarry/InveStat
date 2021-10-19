const express = require("express");
const router = express.Router();
const { portfolio } = require("../models");
var auth = require("../middleware/auth");

const { parse: uuidParse } = require("uuid");

//get
router.get("/", auth, async (req, res) => {
  const userEmail = req.user.email;
  const listOfPortfolio = await portfolio.findAll({
    where: { userEmail: userEmail},
  });
  if (listOfPortfolio === null) {
    console.log("Not found!");
  } else {
    res.json(listOfPortfolio);
  }
});


//set
router.post("/", async (req, res) => {
  const portfolioInfo = req.body;
  //totalValue -> need to add?

  await portfolio.create(portfolioInfo);
  res.json(portfolioInfo);
});


//delete
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


//change portfolioname

module.exports = router;
