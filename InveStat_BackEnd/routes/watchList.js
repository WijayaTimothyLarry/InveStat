const express = require("express");
const router = express.Router();
const { watchlistStock } = require("../models");
var auth = require("../middleware/auth");

/*router.get("/", async(req, res) => {
  const listOfwatchlist = await watchlistStock.findAll()
  res.json(listOfwatchlist);
});*/

//get
router.get("/", auth, async (req, res) => {
  const userEmail = req.user.email;
  const listOfwatchlist = await watchlistStock.findAll({
    where: { userEmail: userEmail },
  });
  if (listOfwatchlist === null) {
    console.log("Not found!");
  } else {
    res.json(listOfwatchlist);
  }
});

//delete
router.delete("/delete", async function (req, res) {
  const reqBody = req.body;
  console.log(reqBody);
  try {
    let currentWatchlistStock = await watchlistStock
      .findOne({
        where: {
          id: reqBody.id,
        },
      })
      .catch((e) => {
        console.log(e.message);
      });
    if (!currentWatchlistStock) {
      console.log("err");
    }
    currentWatchlistStock.destroy();
  } catch (ex) {
    console.log(ex);
  }
  console.log("deleted");
  res.json("deleted");
});

// create - done
router.post("/", async (req, res) => {
  const watchlistInfo = req.body;

  const { dataValues } = await watchlistStock.create(watchlistInfo);
  console.log(dataValues);
  res.json(dataValues);
});

module.exports = router;
