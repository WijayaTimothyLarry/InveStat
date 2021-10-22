// const env = require('dotenv').config({'path':"InveStat_main_repo/InveStat/InveStat_BackEnd/routes/.env"});

const jwt = require("jsonwebtoken");
const JWT_SECRET = "test";

function auth(req, res, next) {
  const token = req.header("x-access-token");
  console.log(token);
  if (!token) {
    res.send("we need token");
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "u failed to authenticate" });
      } else {
        req.user = decoded;
        console.log(req.user.email);
        next();
      }
    });
  }
}

module.exports = auth;
