const express = require("express");
const router = express.Router();

// allowes router to parse json data
router.use(express.json());

// schema model
const User = require("../database/models/User");

/**
 * @route	GET  /users
 * @desc	gets all users
 * @access	private
 */
// router.get("/", async(req, res) => {
//   try {
//     // gets all users from the DB
//     // const users = await User.find()
    
//     return res.json(users)
//   } catch (err) {
//     res.json(err)
//   }
// });

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

    // stores userId into session and sets cookie in brower
    // req.session.userId = user._id
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

    // stores userId into session and sets cookie in brower
    req.session.userId = user._id
    req.session.cookie.maxAge = 60 * 60 * 1000
    return res.send({success: true})

  } catch (error) {
    return res.json(error)
  }
})

/**
 * @route	get  users/logout
 * @desc	logs out the user  
 * @access	public
 */
router.get('/logout', (req, res) => {
  try {
    if(req.session)
      res.session.destroy((err) => {
        if(err) throw err
        return res.json({sucess: true})
      })
  } catch (error) {
    return res.json({sucess: false, msg: err})
  }
})


router.get('/checkLogged', (req, res) => {
  console.log(req.session)
  if(req.session.userId)
    return res.json({msg: 'good'})
  else  
    return res.json({msg: 'badd'})
})

// export router, making user api's available for use
module.exports = router;
