const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user } = require("../models");
const JWT_SECRET = "test";

router.get("/", async (req, res) => {
  const listOfUser = await user.findAll();
  res.json(listOfUser);
});

router.get("/delete/:email", async function (req, res, next) {
  let currentUser = await user
    .findOne({ where: { email: req.params.email } })
    .catch((e) => {
      console.log(e.message);
    });
  if (!currentUser) {
    console.log("err");
  }
  currentUser.destroy();
  res.redirect("/");
  console.log("deleted");
});

router.post("/", async (req, res) => {
  const userInfo = req.body;
  let currentUser = await user
    .findOne({ where: { email: userInfo.email } })
    .catch((e) => {
      console.log(e.message);
    });

  if (!currentUser) {
    //Compare with existing user (if email has been used return exception saying email has been used)

    const salt = await bcrypt.genSalt(10);
    userInfo.password = await bcrypt.hash(userInfo.password, salt);

    const currentUser = await user.create(userInfo);
    const token = jwt.sign(
      { email: userInfo.email, name: userInfo.name },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ auth: true, token: token });
  } else {
    res.json({ auth: false, message: "This email is already registered" });
  }
  //res.json(userInfo);
});

module.exports = router;
