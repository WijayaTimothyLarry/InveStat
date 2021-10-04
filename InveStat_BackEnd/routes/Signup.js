const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
//table name
const { user } = require("../models"); 

router.get("/", async(req, res) => {
  const listOfUser = await user.findAll()
  res.json(listOfUser);
});

router.post("/", async(req, res) => {
  const userInfo = req.body;

  // now we set user password to hashed password
  const salt = await bcrypt.genSalt(10);
  userInfo.password = await bcrypt.hash(userInfo.password, salt);
  
  await user.create(userInfo);  
  res.json(userInfo);

})
module.exports = router;