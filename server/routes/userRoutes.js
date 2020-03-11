const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // library to help you hash passwords
const jwt = require('jsonwebtoken') // simplifies use of json web tokens 

// schema model
let User = require("../models/User");

// allowes router to parse json data
router.use(express.json());

// error messages for user routes
const errMessages = {
  emailTaken: 'A user with this email already exist',
  invalidCred: 'Invalid Email or Password'
}


/**
 * @route	GET  /users
 * @desc	gets all users
 * @access	private
 */
router.get("/", async(req, res) => {
  try {
    // gets all users from the DB
    const users = await User.find()
    
    return res.json(users)
  } catch (err) {
    res.json(err)
  }
});

/**
 * @route	POST  users/register
 * @desc	Registers user
 * @access	public
 */
router.post("/register", async(req, res) => {
  try {
    const email = req.body.email.toLowerCase()
    const password = req.body.password

    // check if email or password is missing
    if(!email) return res.json('no email')
    if(!password) return res.json('no password')

    // searches DB for email, & returns if it finds one
    const user = await User.findOne({ email })
    if(user) return res.json('email taken')

    // create a new user object and hashes password
    const newUser = new User({ email })
    newUser.password = newUser.generateHash(password)

    // saves user to DB
    newUser.save()
    return res.json('New User Added')

  } catch (err) {
    res.json(err);
  }
});


/**
 * @route	POST  users/login
 * @desc	logs in a user 
 * @access	public
 */
router.post('/login', async(req, res) => {
  try {
    const email = req.body.email.toLowerCase()
    const password = req.body.password

    // check if email or password is missing
    if(!email) return res.json('no email')
    if(!password) return res.json('no password')

    // searches DB for email, & returns if it finds one
    const user = await User.findOne({ email })
    if(!user) return res.json('user not found')

    // checks if the password entered matches the user password
    const correctPassword = user.validPassword(password, user.password)
    if(!correctPassword) return res.json('invalid password')

    // creates the payload to return to the browser
    const payload = {userId: user._id, email: user.email, password: user.password}
    return res.json(payload)

  } catch (error) {
    return res.json(error)
  }
})

// export router, making user api's available for use
module.exports = router;
