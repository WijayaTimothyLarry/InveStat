const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { user } = require("../models"); 

router.get("/", async(req, res) => {
  const listOfUser = await user.findAll()
  res.json(listOfUser);
});


router.get("/delete/:email", async function(req, res) {
  let currentUser = await user.findOne({where: {email: req.params.email}}).catch(e => {
     console.log(e.message)
  })
  if (!currentUser){
    console.log("err");
  }
  currentUser.destroy();
  res.redirect('/');
  console.log('deleted');
});


router.post("/", async(req, res) => {
  const userInfo = req.body;
  console.log(userInfo.name);
  console.log(userInfo.email);
  console.log(userInfo.password);

  const salt = await bcrypt.genSalt(10);
  userInfo.password = await bcrypt.hash(userInfo.password, salt);
  
  await user.create(userInfo);  
  res.json(userInfo);

})


module.exports = router;