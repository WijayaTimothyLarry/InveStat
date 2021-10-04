const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
 
const app = express();
app.use(express.json());
app.use(cors());
const db = require("./models");

// Routers
const signUpRouter = require("./routes/Signup");
app.use("/signup", signUpRouter);

const loginRouter = require("./routes/Login");
app.use("/login", loginRouter);


db.sequelize.sync().then(()=> {

    app.listen(3001,() => {
        console.log('running server on 3001');
    })
});
