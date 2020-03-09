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
router.get("/", (req, res) => {
  try {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
  
  } catch (err) {
    res.json(err)
  }
});

/**
 * @route	POST  users/register
 * @desc	Registers user
 * @access	public
 */
router.post("/register", (req, res) => {
  try {

    // checks if email already exist in DB
    User.findOne({email: req.body.email})
    .then(user => {
        if(user)
            res.status(400).json(errMessages.emailTaken)
    })

    // create a new user object
    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });
    const saltRounds = 10;
    console.log(newUser)
    // generates password salt
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) throw err;

      // applies salt to password and hashes it
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;

        newUser.save() // saves user to DB
          .then(() => res.json({ msg: "New User registered", success: true }))
          .catch(err => {
            res.status(400).json(err);
          });
      });
    });
  } catch (err) {
    res.json(err);
  }
});


/**
 * @route	POST  users/login
 * @desc	logs in a user 
 * @access	public
 */
router.post('/login', (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        // finds user by email in the DB
        User.findOne({ email })
        .then(user => {
            if(!user)
                res.json(errMessages.invalidCred)

            // compares the password typed in with the password in DB
            bcrypt.compare(password, user.password)
            .then(isMath =>{
                if(!isMath)
                    res.json(errMessages.invalidCred)

                // user found, prepare create jwt payload 
                const payload = {userId: user._id, email: user.email, password: user.password}

                // sign token 
                jwt.sign(payload, 'secret', {expiresIn: '1h'}, (err, token) =>{
                    res.json({
                        success: true,
                        payload: payload,
                        token: 'Bearer ' + token
                    })
                })
            })
        }) 
    } catch (error) {
        res.json(error)
    }
})

// export router, making user api's available for use
module.exports = router;
