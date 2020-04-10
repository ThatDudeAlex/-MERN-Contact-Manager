const express = require("express");
const router = express.Router();

const mid = require('../auth')

// allowes router to parse json data
router.use(express.json());

// schema model
const User = require("../database/models/User");

/**
 * @route	POST  users/register
 * @desc	Registers user
 * @access	public
 */
router.post("/register", async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const {firstName, lastName, password, confirmPassword} = req.body


    // check if email or password is missing
    if (!firstName) return res.json({ success: false, msg: "missing First Name" });
    if (!lastName) return res.json({ success: false, msg: "missing Last Name" });
    if (!email) return res.json({ success: false, msg: "no email" });
    if (!password) return res.json({ success: false, msg: "no password" });
    if (!confirmPassword) return res.json({ success: false, msg: "missing password confirmation" });
    if (password !== confirmPassword) return res.json({ success: false, msg: "passwords do not match" });

    // searches DB for email, & returns if it finds one
    const user = await User.findOne({ email });
    if (user) return res.json({ success: false, msg: "email taken" });

    // create a new user object and hashes password
    const newUser = new User({ firstName, lastName, email });
    newUser.password = newUser.generateHash(password);

    // saves user to DB
    newUser
      .save()
      .then((user) => {
        return res.json({ success: true, msg: "New User Added", registedUser: user });
      })
      .catch((err) => {
        return { success: false, msg: err };
      });
  } catch (err) {
    return res.json({ success: false, msg: err });
  }
});

/**
 * @route	POST  users/login
 * @desc	logs in a user
 * @access	public
 */
router.put("/login", async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    // check if email or password is missing
    if (!email) return res.json("no email");
    if (!password) return res.json("no password");

    // searches DB for email, & returns if it finds one
    const user = await User.findOne({ email });
    if (!user) return res.json("user not found");

    // checks if the password entered matches the user password
    const correctPassword = user.validPassword(password, user.password);
    if (!correctPassword) return res.json("invalid password");

    // stores userId into session and sets cookie in brower
    req.session.userId = user._id;
    req.session.cookie.maxAge = 5 * 60 * 60 * 1000;
    // console.log(req.session)
    return res.send({ success: true });
  } catch (error) {
    return res.json(error);
  }
});

/**
 * @route	get  users/logout
 * @desc	logs out the user
 * @access	public
 */
router.put("/logout", (req, res) => {
  try {
    if (req.session){
      req.session.destroy(function(err) {
        if (err) return next(err);
        
        req.session = null
        return res.json({ success: true });
      });
    }
  } catch (error) {
    return res.json({ success: false, msg: 'error here' });
  }
});

router.get("/isLoggedIn", (req, res) => {
  if (req.session.userId) return res.json({success:true, msg: "user is authenticated" });
  return res.json({success:false, msg: "user not authenticated" });
});

// export router, making user api's available for use
module.exports = router;
