const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { user } = require("../models"); 
const bcrypt = require("bcrypt");
const env = require('dotenv').config();

//global variable
var token ="";

const verifyJWT = (req,res,next) => {
    const token = req.headers["x-access-token"]
    if (!token){
        res.send('we need token')
    }
    else{
        jwt.verify(token,"process.env.JWT_SECRET_TOKEN",(err,decoded) => {
            if (err){
                res.json({auth : false, message: "u failed to authenticate"});
            }else{
                req.userId = decoded.id;
                next();
            }
        })
    }
}


router.get("/", verifyJWT, (req,res) => {
    console.log("successful authentication")
    res.send("you are authenticated");
})


router.post("/", async(req, res) =>{
    const {email, password}= req.body;
    const currentUser = await user.findOne({ where: { email: email } });

    bcrypt.compare(password, currentUser.password , function(err, result) {
        // result == true
        if (result==false){
            console.log("wrong password")
            res.json({auth : false, message:"wrong password"})
        }
        else{
            const id = currentUser.email
            const token = jwt.sign({email : id}, "process.env.JWT_SECRET_TOKEN", {expiresIn:"1h"});            
            res.json({auth : true, token: token, currentUser : currentUser})
        }
    });
    delete currentUser.password;
    console.log("successful_login")
})

module.exports = router;


