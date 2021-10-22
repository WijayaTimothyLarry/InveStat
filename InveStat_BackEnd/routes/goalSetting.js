const express = require("express");
const router = express.Router();
const {goalSetting} = require("../models");
var auth = require("../middleware/auth");

//get
router.get("/", auth, async (req, res) => {
    const userEmail = req.user.email;
    const goal = await goalSetting.findAll({
        where: {
            userEmail: userEmail
        },
    });
    if (goal === null) {
        console.log("Not found!");
    } else {
        res.json(goal);
    }
});


//set
router.post("/", auth, async (req, res) => {
    const goal = req.body;
    // console.log(req.user.email);
    // console.log(currentGoal);
    currentGoal = await goalSetting.create({
        initialValue : goal.initialValue,
        duration : goal.duration,
        additionalContribution : goal.additionalContribution,
        overallTarget : goal.overallTarget,
        expectedReturnPerYear : goal.expectedReturnPerYear,
        userEmail : req.user.email,
      });
    res.json(currentGoal);
});


//delete
// router.get("/delete", auth, async function (req, res) {
//   const reqBody = req.body;
//   console.log(reqBody);
//   let currentPortfolio = await portfolio
//     .findOne({
//       where: {
//         id: reqBody.id,
//       },
//     })
//     .catch((e) => {
//       console.log(e.message);
//     });
//   if (!currentPortfolio) {
//     console.log("err");
//   }
//   currentPortfolio.destroy();
//   console.log("deleted");
//   res.json("deleted");
// });


//change portfolioname

module.exports = router;