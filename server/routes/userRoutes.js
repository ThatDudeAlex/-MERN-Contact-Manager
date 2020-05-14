const express = require("express");
const crypto = require("crypto") 
const router = express.Router();

// email module
const recoveryMail = require("../mail/transporter")
// Error Messages
const constErrMessage = require("../constants/errMessages")
// Validator
const { 
  validate, 
  userLoginRules, 
  userRegisterRules,
  passwordRecEmailRules,
  recoveryTokenRules,
  recoveryUpdateRules
} = require('./helper/validator')

const {asyncHandler} = require('./helper/asyncHandler')

// allowes router to parse json data
router.use(express.json());

// schema model
const User = require("../database/models/User");

/**
 * @route	POST  users/register
 * @desc	Registers user
 * @access	public
 */
router.post("/register", userRegisterRules(), validate, asyncHandler(async(req, res) => {
    const email = req.body.email.toLowerCase();
    const { firstName, lastName, password } = req.body;

    // create a new user object and hashes password
    const newUser = new User({ firstName, lastName, email });
    newUser.password = newUser.generateHash(password);

    // saves user to DB
    newUser.save();
    return res.json(newUser);
  })
);

/**
 * @route	POST  users/login
 * @desc	logs in a user
 * @access	public
 */
router.post("/login", userLoginRules(), validate, asyncHandler(async(req, res) => {
    const email = req.body.email.toLowerCase();
    const { rememberMe } = req.body;
    
    const user = await User.findOne({ email }); // searches DB for user email
    const usersName = `${user.firstName} ${user.lastName}` // formats name to display in header

    // stores userId & name into session and sets cookie in brower
    req.session.userId = user._id;
    req.session.usersName = usersName;

    // Set session to expire in 5yrs ( in milli seconds ) else set it to expire in 1 hour
    // format: yrs * days * hrs * mins * secs * milliSecs
    if(rememberMe) req.session.cookie.maxAge =  5 * 365 * 24 * 60 * 60 * 1000;
    return res.send({name: usersName, id: user._id});
  })
);

/**
 * @route	get  users/getAuthenticatedUser
 * @desc	returns user if they're authenticated
 * @access	public
 */
router.get("/getAuthenticatedUser", asyncHandler((req, res) => {
    if(req.session.userId) {
      const user = {name: req.session.usersName, id: req.session.userId}
      return res.send(user)
    }
    res.end()
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
        if (err) return res.status(500).send(constErrMessage.serverErr);
        else {
          req.session = null;
          return res.end()
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
router.post("/passwordRecoveryEmail", passwordRecEmailRules(), validate, asyncHandler(async(req, res) => {
  const {email} = req.body

  // searches DB for email, & returns if doesn't finds one
  const user = await User.findOne({ email });
  const token = crypto.randomBytes(4).toString('hex')  // generate recovery token

  // assigns recovery token to the user & set to expire in 1 hr 
  await user.updateOne(
    {"passwordRecovery.token": token, "passwordRecovery.expires": Date.now() + (60 * 60 * 1000)}
  )
  
  // send email to user
  recoveryMail(email, token)
  return res.send("sent recovery email");
}))


/**
 * @route	get  users/verifyRecoveryToken
 * @desc	Verifies if user entered the correct token
 * @access	public
 */
router.post("/verifyRecoveryToken", recoveryTokenRules(), validate,
asyncHandler(async(req, res) => {
  const {token} = req.body

  // searches DB for email, & returns if doesn't finds one
  const user = await User.findOne({ "passwordRecovery.token": token });
  
  // verifies if token is expired, and remove token if it is
  if (Date.now() > user.passwordRecovery.expires){
    await user.update({"passwordRecovery.token": "", "passwordRecovery.expires": null})
    return res.status(401).send(constErrMessage.expiredToken)
  }

  return res.send("Valid recovery token");  
}))


/**
 * @route	get  users/recoverPassword
 * @desc	Updates users account with new password
 * @access	public
 */
router.put("/recoverPassword", recoveryUpdateRules(), validate, asyncHandler(async(req, res) => {
  const {password, email} = req.body

  // searches DB for email, & returns if doesn't finds one
  const user = await User.findOne({ email });
  // updates account with the new password
  await user.updateOne({ password: user.generateHash(password) })

  return res.send("Your password has been updated");  
}))

// export router, making user api's available for use
module.exports = router;
