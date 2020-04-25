const express = require("express");
const router = express.Router();

// schemas
const Contact = require("../database/models/Contact");

const {isAuthenticated} = require("./helper/auth")
const { validate, userContactsRules } = require('./helper/validator')

// Error Messages
const constErrMessage = require("../constants/errMessages")

// allowes router to parse json data
router.use(express.json());

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
 * @route	GET  contacts/getAllContacts
 * @desc	gets all contacts for a given user
 * @access	public
 */
router.get("/getAllContacts", isAuthenticated, asyncHandler(async (req, res) => {
    const { userId } = req.session;

    // querys DB for all contacts belonging to the user
    const contacts = await Contact.find({ userId: userId })
    return res.json({ success: true, contacts: contacts });
  })
);


/**
 * @route	POST  contacts/addContact
 * @desc	creates a new contact
 * @access	public
 */
router.post("/addContact", isAuthenticated, userContactsRules(), validate,
asyncHandler(async(req, res) => {
    const { name, email, phoneNumber } = req.body;
    const { userId } = req.session;

    // create new contact object, to save into DB
    const newContact = new Contact(
      { userId, name, email, phoneNumber }
    )

    await newContact.save() // saves contact to DB
    return res.send(newContact)
  })
);


/**
 * @route	DELETE  contacts/deleteContact
 * @desc	deletes selected contact
 * @access	public
 */
router.delete("/deleteContact/:_id", isAuthenticated, asyncHandler(async(req, res) => {
    const _id = req.params._id;
    
    // checks if user id is provided
    if (!_id) return res.status(500).json(constErrMessage.serverErr);

    // deletes contact from DB and returns it
    const deletedContact = await Contact.findOneAndDelete({_id})
    if (deletedContact) return res.end()
  })
);


/**
 * @route	PATCH  contacts/editContact
 * @desc	edits selected contact
 * @access	public
 */
router.patch("/editContact", isAuthenticated, userContactsRules(), validate, asyncHandler(async(req, res) => {
    const { _id, name, email, phoneNumber } = req.body;

    // Checks if contact _id is invalid
    if (!_id) return res.status(500).send({msg: constErrMessage.serverErr});

    // finds contact in DB
    contact = await Contact.findById(_id)

    // Updated contact info
    contact.updateOne({ name, email, phoneNumber }, (err) => {
      if (err) return res.status(500).send({msg: constErrMessage.serverErr});
      else return res.send("Contact Updated");
    });
  })
);

// export router, making contact api's available for use
module.exports = router;
