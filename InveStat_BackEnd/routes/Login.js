const express = require("express");
const router = express.Router();
const { user } = require("../models"); 


const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}


// This will hold the users and authToken related to users
const authTokens = {};

router.post('/', async(req, res) => {

    console.log('successful_login');

});

module.exports = router;




// const { email, password } = req.body;
// // const hashedPassword = getHashedPassword(password);
// const salt = await bcrypt.genSalt(10);
// const hashedPassword = await bcrypt.hash(password, salt);

// const userInfo = user.find(u => {
//     return u.email === email && u.password === hashedPassword 
// });

// if (userInfo) {
//     const authToken = generateAuthToken();

//     // Store authentication token
//     authTokens[authToken] = user;

//     // Setting the auth token in cookies
//     res.cookie('AuthToken', authToken);
//     // Redirect user to the protected page
//     res.redirect('/mainpage');
// } else {
//     res.render('login', {
//         message: 'Invalid username or password',
//         messageClass: 'alert-danger'
//     });
// }