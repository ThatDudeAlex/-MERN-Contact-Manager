const express = require("express");
const crypto = require("crypto") 
const router = express.Router();

// Error Messages
const constErrMessage = require("../constants/errMessages")

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

    // stores all error messages to return
    const errors = {firstName: "", lastName: "", password: "", confirmPassword: "", email: ""};

    // sets errors for any info that is missing
    if (!firstName) errors.firstName = constErrMessage.missingFirstName
    if (!lastName) errors.lastName = constErrMessage.missingLastName
    if (!email) errors.email = constErrMessage.missingEmail
    if (!password) errors.password = constErrMessage.missingPassword
    if (!confirmPassword) errors.confirmPassword = constErrMessage.missingPassConfirm

    // returns errors if any information is missing
    if(!firstName || !lastName || !email || !password || !confirmPassword) 
      return res.status(400).send(errors);

    // verifies that passwords match
    if (password !== confirmPassword)
      return res.status(404).send({...errors, confirmPassword: constErrMessage.noMatch});

    // searches DB for email, & returns if it finds one
    const user = await User.findOne({ email });
    if (user) return res.status(409).send({ ...errors, email: constErrMessage.takenEmail });

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
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const email = req.body.email.toLowerCase();
    const { password, rememberMe } = req.body;

    // stores all error messages to return
    const errors = {email: "", password: ""};

    // sets errors if email or password are missing
    if (!email) errors.email = constErrMessage.missingEmail
    if (!password) errors.password = constErrMessage.missingPassword

    // returns errors if email or password are missing
    if(!email || !password)
      return res.status(400).send(errors);
    
    // searches DB for email, & returns if doesn't finds one
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({...errors, email: constErrMessage.incorrectEmail});

    // checks if the password entered matches the user password
    const correctPassword = user.validPassword(password, user.password);
    if (!correctPassword)
      return res.status(401).send({...errors, password: constErrMessage.incorrectPassword});

    // formats users name to display in header
    const usersName = `${user.firstName} ${user.lastName}`

    // stores userId into session and sets cookie in brower
    req.session.userId = user._id;
    req.session.usersName = usersName

    // if remember is checked, set session to expire in 5yrs ( in milli seconds )
    // else set it to expire in 1 hour
    // yrs * days * hrs * mins * secs * milliSecs
    if(rememberMe) req.session.cookie.maxAge =  5 * 365 * 24 * 60 * 60 * 1000;
    else req.session.cookie.maxAge = 60 * 60 * 1000

    return res.send(usersName);
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
    if (req.session.userId){
      const usersName = req.session.usersName
      return res.send(usersName);
    }
    else return res.status(401).send("user not authenticated");
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
        if (err) return res.send({ success: false, errMsgs: err });
        else {
          req.session = null;
          return res.send({ success: true, errMsgs: "user logged out" });
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
  if (!email) return res.status(400).send( constErrMessage.missingEmail );

  // searches DB for email, & returns if doesn't finds one
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send(constErrMessage.incorrectEmail );

  // generate recovery token
  const token = crypto.randomBytes(4).toString('hex')

  // assigns recovery token to the user & set to expire in 1 hr 
  await user.updateOne({"passwordRecovery.token":token, "passwordRecovery.expires":Date.now() + (60 * 60 * 1000)})
  
  // send email to user
  recoveryMail(email, token)
  return res.json("sent recovery email");
}))


/**
 * @route	get  users/verifyRecoveryToken
 * @desc	Verifies if user entered the correct token
 * @access	public
 */
router.post("/verifyRecoveryToken", asyncHandler(async(req, res) => {
  const {token, email} = req.body
  
  // check if token or email is missing
  if (!email) return res.status(400).send(constErrMessage.missingEmail);
  if (!token) return res.status(400).send(constErrMessage.missingToken);

  // searches DB for email, & returns if doesn't finds one
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send(constErrMessage.incorrectEmail);

  // compare user input with recovery token
  if (token !== user.passwordRecovery.token) return res.status(400).send(constErrMessage.incorrectToken)
  
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
router.put("/recoverPassword", asyncHandler(async(req, res) => {
  const {password, confirmPassword, email} = req.body
  const errors = { password: "", confirmPassword: "" }

  // check if any required info is missing
  if (!email) errors.email = constErrMessage.missingEmail
  if (!password)  errors.password = constErrMessage.missingPassword
  if (!confirmPassword) errors.confirmPassword = constErrMessage.missingPassConfirm

  if(!email || !password || !confirmPassword)
    return res.status(400).send(errors)

  // verifies that passwords match 
  if (password !== confirmPassword) return res.status(400).send({...errors, confirmPassword: constErrMessage.noMatch});

  // searches DB for email, & returns if doesn't finds one
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send({...errors, email: constErrMessage.incorrectEmail});

  // updates account with the new password
  await user.updateOne({ password: user.generateHash(password) })

  return res.send("Password Changed");  
}))

// export router, making user api's available for use
module.exports = router;
