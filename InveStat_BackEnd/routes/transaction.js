const express = require("express");
const router = express.Router();
const { transaction } = require("../models"); 

router.get("/", async(req, res) => {
  const listOfTransactions = await transaction.findAll()
  res.json(listOfTransactions);
});


module.exports = router;