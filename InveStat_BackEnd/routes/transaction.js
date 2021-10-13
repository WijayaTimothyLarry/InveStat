const express = require("express");
const router = express.Router();
const { transaction } = require("../models"); 

router.get("/", async(req, res) => {
  console.log(req.name);
  const listOfTransactions = await transaction.findAll()
  res.json(listOfTransactions);
});


module.exports = router;