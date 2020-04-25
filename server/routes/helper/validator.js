
const { body, validationResult } = require('express-validator')
// Error Messages
const constErrMessage = require("../../constants/errMessages")

// schema model
const User = require("../../database/models/User");

const userValidationRules = () => {
 
  return [
    // email must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),

    body('confirmPassword').matches(body('password')),
  ]
}

const userLoginRules = () => {
  return [
    body('email', constErrMessage.missingEmail).notEmpty(),
    body('email', constErrMessage.incorrectEmail).isEmail(),
    body('email', constErrMessage.nonExistingEmail).custom( async(email) => {
      const user = await User.findOne({email})

      if(user) return Promise.resolve()
      else return Promise.reject()
    }),

    body('password', constErrMessage.missingPassword).notEmpty(),
    body('password', constErrMessage.incorrectPassword).custom(async(password, {req}) => {
      const user = await User.findOne({email: req.body.email})
      
      if(!user) return Promise.reject()
      if(user.validPassword(password, user.password)) return Promise.resolve()
      else return Promise.reject()
    })
  ]
}



const userRegisterRules = () => {
  return [
    body("firstName", constErrMessage.missingFirstName).notEmpty(),
    body("lastName", constErrMessage.missingFirstName).notEmpty(),

    body('email', constErrMessage.missingEmail).notEmpty(),
    body("email", constErrMessage.incorrectEmail).isEmail(),
    body('email', constErrMessage.takenEmail).custom( async(email) => {
      const user = await User.findOne({email})

      if(user) return Promise.reject()
      else return Promise.resolve()
    }),

    body('password', constErrMessage.missingPassword).notEmpty(),
    body('password', constErrMessage.passwordLen).isLength({min:4}),

    body("confirmPassword", constErrMessage.missingPassConfirm).notEmpty(),
    body("confirmPassword", constErrMessage.noMatch).custom((confirmPassword, {req}) => {
      if (confirmPassword !== req.body.password) return Promise.reject()
      else return Promise.resolve()
    }),
  ]
}

const userContactsRules = () => {
  return [
    body("name", constErrMessage.missingContactName).notEmpty(),
    body("phoneNumber", constErrMessage.missingContactInfo).custom((phoneNumber, {req}) => {
      if(!phoneNumber && !req.body.email) return Promise.reject()
      else return Promise.resolve()
    }),
    body("email", constErrMessage.missingContactInfo).custom((email, {req}) => {
      if(!email && !req.body.phoneNumber) return Promise.reject()
      else return Promise.resolve()
    }),
  ]
}

const passwordRecEmailRules = () => {
  return [
    body('email', constErrMessage.missingEmail).notEmpty(),
    body('email', constErrMessage.incorrectEmail).isEmail(),
    body('email', constErrMessage.nonExistingEmail).custom( async(email) => {
      const user = await User.findOne({email})

      if(user) return Promise.resolve()
      else return Promise.reject()
    }),
  ]
}

const recoveryTokenRules = () => {
  return [
    body('token', constErrMessage.missingToken).notEmpty(),
    body('token', constErrMessage.incorrectToken).custom(async(token) => {
      const user = await User.findOne({ "passwordRecovery.token": token })
      if (!user) return Promise.reject()
      if (token !== user.passwordRecovery.token) return Promise.reject()
      return Promise.resolve()
    }),
  ]
}

const recoveryUpdateRules = () => {
  return [
    body('password', constErrMessage.missingPassword).notEmpty(),
    body('password', constErrMessage.passwordLen).isLength({min:4}),

    body("confirmPassword", constErrMessage.missingPassConfirm).notEmpty(),
    body("confirmPassword", constErrMessage.noMatch).custom((confirmPassword, {req}) => {
      if (confirmPassword !== req.body.password) return Promise.reject()
      else return Promise.resolve()
    }),
  ]
}

const handleErrors = (errors) => {
  const extractedErrors = {}

  errors.array().forEach(err => {
    if(!extractedErrors.hasOwnProperty(err.param))
      extractedErrors[err.param] = err.msg
  })

  return extractedErrors
}


const validate = async (req, res, next) => {
  const errors = await validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }

  extractedErrors = handleErrors(errors)

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate,
  userLoginRules,
  userRegisterRules,
  userContactsRules,
  passwordRecEmailRules,
  recoveryTokenRules,
  recoveryUpdateRules
}