const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
 
const app = express();
app.use(express.json());
app.use(cors());
const db = require("./models");

// // Routers
const signUpRouter = require("./routes/Signup");
app.use("/users", signUpRouter);

const loginRouter = require("./routes/Login");
app.use("/login", loginRouter);


db.sequelize.sync().then(()=> {

    app.listen(3001,() => {
        console.log('running server on 3001');
    })
});

// var mysql = require('mysql');

// var connection = mysql.createConnection({
//   host     : "investat.c4x9cbbouqsz.us-east-2.rds.amazonaws.com",
//   user     : "admin",
//   password : "cz2006investat",
//   port     : "3306",
//   database :""
// });

// connection.connect(function(err) {
//   if (err) {
//     console.error('Database connection failed: ' + err.stack);
//     return;
//   }

//   console.log('Connected to database.');
// });

// connection.end();