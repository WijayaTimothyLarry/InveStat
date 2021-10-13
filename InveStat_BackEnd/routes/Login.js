// require("dotenv").config(); 
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { user } = require("../models"); 
const bcrypt = require("bcrypt");
const JWT_SECRET = "test";


function verifyJWT (req,res,next) {
    const token = req.headers["x-access-token"]
    if (!token){
        res.send('we need token')
    }
    else{
        jwt.verify(token,JWT_SECRET,(err,decoded) => {
            if (err){
                res.json({auth : false, message: "u failed to authenticate"});
            }else{
                req.user = decoded.email;
                console.log(req.user);
                next();
            }
        })
    }
}

  
router.get("/", verifyJWT, (req,res) => {
    console.log("successful authentication");
    console.log(req.user);
    res.send("you are authenticated");
})


router.post("/", async(req, res) =>{
    const {email, password}= req.body;
    const currentUser = await user.findOne({ where: { email: email } });
    bcrypt.compare(password, currentUser.password , function(err, result) {
        // result == true
        if (result){
            const id = currentUser.email
            const name = currentUser.name
            console.log('JWT_SECRET', JWT_SECRET)
            const token = jwt.sign({email : id}, JWT_SECRET, {expiresIn:"1h"});            
            res.json({auth : true, token: token, currentUser : currentUser})
            
        }
        else{
            console.log("wrong password")
            res.json({auth : false, message:"wrong password"})
        }

    });

    delete currentUser.password;
    console.log("successful_login")

})

module.exports = router;
