const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // A library to help you hash passwords

// schema model
let User = require("../models/User");

router.use(express.json());

// router.get("/test", (req, res) => res.json({ msg: "User works" }));

router.get("/", (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.json(err));
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
            res.status(400).json('A user with this email already exist')
    })

    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });
    const saltRounds = 10;

    // generates password salt
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) throw err;

      // applies salt to password and hashes it
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;

        newUser
          .save() // saves user to DB
          .then(() => res.json({ msg: "New User registered", success: true }))
          .catch(err => {
            res.status(400).json("unknown error while registering user");
          });
      });
    });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
