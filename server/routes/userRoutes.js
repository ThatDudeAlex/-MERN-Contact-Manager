const express = require("express");
const crypto = require("crypto") 
const router = express.Router();

// email module
const recoveryMail = require("../mail/transporter")

// allowes router to parse json data
router.use(express.json());

// schema model
const User = require("../database/models/User");

// wraps incoming functions inside an async function with try catch methods
const asyncHandler = (incomingFunction) => {
  return async (req, res, next) => {
    try {
      await incomingFunction(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

/**
 * @route	POST  users/register
 * @desc	Registers user
 * @access	public
 */
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const email = req.body.email.toLowerCase();
    const { firstName, lastName, password, confirmPassword } = req.body;

    // check if any required info is missing
    if (!firstName)
      return res.json({ success: false, msg: "missing First Name" });
    if (!lastName)
      return res.json({ success: false, msg: "missing Last Name" });
    if (!email) return res.json({ success: false, msg: "no email" });
    if (!password) return res.json({ success: false, msg: "no password" });
    if (!confirmPassword)
      return res.json({ success: false, msg: "missing password confirmation" });
    
    // verifies that passwords match
    if (password !== confirmPassword)
      return res.json({ success: false, msg: "passwords do not match" });

    // searches DB for email, & returns if it finds one
    const user = await User.findOne({ email });
    if (user) return res.json({ success: false, msg: "email taken" });

    // create a new user object and hashes password
    const newUser = new User({ firstName, lastName, email });
    newUser.password = newUser.generateHash(password);

    // saves user to DB
    newUser.save();
    return res.json({
      success: true,
      msg: "New User Added",
      registedUser: user,
    });
  })
);

/**
 * @route	POST  users/login
 * @desc	logs in a user
 * @access	public
 */
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    // check if email or password is missing
    if (!email) return res.json({ success: false, msg: "no email" });
    if (!password) return res.json({ success: false, msg: "no password" });

    // searches DB for email, & returns if doesn't finds one
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, msg: "user not found" });

    // checks if the password entered matches the user password
    const correctPassword = user.validPassword(password, user.password);
    if (!correctPassword)
      return res.json({ success: false, msg: "invalid password" });

    // stores userId into session and sets cookie in brower
    req.session.userId = user._id;
    req.session.cookie.maxAge = 5 * 60 * 60 * 1000;

    return res.json({ success: true, msg: "User logged in" });
  })
);

/**
 * @route	get  users/isAuthenticated
 * @desc	verifies if user is authenticated
 * @access	public
 */
router.get(
  "/isAuthenticated",
  asyncHandler((req, res) => {
    if (req.session.userId)
      return res.json({ success: true, msg: "user is authenticated" });
    else return res.json({ success: false, msg: "user not authenticated" });
  })
);


/**
 * @route	get  users/logout
 * @desc	logs user out of the app
 * @access	public
 */
router.get("/logout", asyncHandler((req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) return res.send({ success: false, msg: err });
        else {
          req.session = null;
          return res.send({ success: true, msg: "user logged out" });
        }
      });
    }
  })
);


/**
 * @route	get  users/passwordRecoveryEmail
 * @desc	Sends a password recovery token to the users email
 * @access	public
 */
router.post("/passwordRecoveryEmail", asyncHandler(async(req, res) => {
  const {email} = req.body

  // check if email is missing
  if (!email) return res.json({ success: false, msg: "no email" });

  // searches DB for email, & returns if doesn't finds one
  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false, msg: "user not found" });

  // generate recovery token
  const token = crypto.randomBytes(4).toString('hex')

  // assigns recovery token to the user & set to expire in 1 hr 
  await user.updateOne({"passwordRecovery.token":token, "passwordRecovery.expires":Date.now() + (60 * 60 * 1000)})
  
  // send email to user
  recoveryMail(email, token)
  return res.json({ success: true, msg: "sent recovery email" });
}))


/**
 * @route	get  users/verifyRecoveryToken
 * @desc	Verifies if user entered the correct token
 * @access	public
 */
router.post("/verifyRecoveryToken", asyncHandler(async(req, res) => {
  const {token, email} = req.body
  
  // check if token or email is missing
  if (!email) return res.json({ success: false, msg: "no email" });
  if (!token) return res.json({ success: false, msg: "no email code" });

  // searches DB for email, & returns if doesn't finds one
  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false, msg: "user not found" });

  // compare user input with recovery token
  if (token !== user.passwordRecovery.token) return res.json({success: false, msg: "invalid token"})
  
  // verifies if token is expired, and remove token if it is
  if (Date.now() > user.passwordRecovery.expires){

    await user.update({"passwordRecovery.token": "", "passwordRecovery.expires": null})
    return res.json({success: false, msg: "expired token"})
  }

  return res.json({ success: true, msg: "Valid recovery token" });  
}))


/**
 * @route	get  users/recoverPassword
 * @desc	Updates users account with new password
 * @access	public
 */
router.put("/recoverPassword", asyncHandler(async(req, res) => {
  const {password, confirmPassword, email} = req.body

  // check if any required info is missing
  if (!email) return res.json({ success: false, msg: "no email" });
  if (!password) return res.json({ success: false, msg: "no password" });
  if (!confirmPassword)
    return res.json({ success: false, msg: "missing password confirmation" });

  // verifies that passwords match 
  if (password !== confirmPassword)
    return res.json({ success: false, msg: "passwords do not match" });


  // searches DB for email, & returns if doesn't finds one
  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false, msg: "user not found" });

  // updates account with the new password
  await user.updateOne({ password: user.generateHash(password) })

  return res.json({ success: true, msg: "Password Changed" });  
}))

// export router, making user api's available for use
module.exports = router;
