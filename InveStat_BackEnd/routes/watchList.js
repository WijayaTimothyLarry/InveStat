const express = require("express");
const router = express.Router();
const { watchlistStock } = require("../models"); 


router.get("/", async(req, res) => {
  const listOfwatchlist = await watchlistStock.findAll()
  res.json(listOfwatchlist);
});

router.get("/delete/:wStockTickerId", async function (req, res, next) {
    let currentWatchlist = await watchlistStock
      .findOne({ where: { wStockTickerId: req.params.wStockTickerId } })
      .catch((e) => {
        console.log(e.message);
      });
    if (!currentWatchlist) {
      console.log("err");
    }
    currentWatchlist.destroy();
    res.redirect("/");
    console.log("deleted");
  });
// not sure if delete method is working

router.post("/", async (req, res) => {
  const watchlistInfo = req.body;
  console.log(watchlistInfo);
  console.log(watchlistInfo.wStockTickerId);
  console.log(watchlistInfo.userEmail);
  
  await watchlistStock.create(watchlistInfo);
  res.json(watchlistInfo);
});

module.exports = router;