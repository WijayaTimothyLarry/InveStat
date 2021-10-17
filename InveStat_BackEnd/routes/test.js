const express = require("express");
const router = express.Router();
const { test1 } = require("../models"); 

router.get("/", async (req, res) => {
    const teststr = await test1.findAll();
    res.json(teststr);
  });
  
  module.exports = router;
  
router.post("/", async(req, res) => {

    const testing = req.body;
    console.log(testing.portfolioName);
    await test1.create(testing);
    res.json(testing);
  });
  
  module.exports = router;
  