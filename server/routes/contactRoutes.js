const express = require("express");
const router = express.Router();

// schemas
const Contact = require("../database/models/Contact");

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
router.get("/getAllContacts", asyncHandler(async (req, res) => {
    const { userId } = req.session;

    // checks if user id is provided
    if (!userId) return res.json({ success: false, msg: "no user" });

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
router.post("/addContact", asyncHandler(async(req, res) => {
    const { name, email, phoneNumber } = req.body;
    const { userId } = req.session;

    const errors = {name: "", email: "", phoneNumber: ""}

    if (!name) errors.name = constErrMessage.missingContactName
    if (!email && !phoneNumber) {
      errors.email = constErrMessage.missingContactInfo
      errors.phoneNumber = constErrMessage.missingContactInfo
    }

    console.log('hoooo')

    if(!name && (!email && !phoneNumber))
      return res.status(400).send(errors)

    // checks if user id is provided
    if (!userId) return res.status(401).send("Invalid User ID" );

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
router.delete("/deleteContact", asyncHandler(async(req, res) => {
    const _id = req.body._id;

    // checks if user id is provided
    if (!_id) return res.json({success: false, msg: "no contact id found"});

    // deletes contact from DB and returns it
    const deletedContact = await Contact.findOneAndDelete({ _id: _id })

    if (deletedContact)
      return res.json({
        msg: "contact deleted",
        success: true,
        _id: _id,
      });
  })
);


/**
 * @route	PATCH  contacts/editContact
 * @desc	edits selected contact
 * @access	public
 */
router.patch("/editContact", asyncHandler(async(req, res) => {
    const { _id, name, email, phoneNumber } = req.body;

    const errors = {name: "", email: "", phoneNumber: ""}

    // Checks if contact _id is invalid
    if (!_id) return res.status(404).send("invalid contact id");

    // Sets errors for any missing info
    if (!name) errors.name = constErrMessage.missingContactName
    if (!email && !phoneNumber){
      errors.email = constErrMessage.missingContactInfo
      errors.phoneNumber = constErrMessage.missingContactInfo
    }
    
    // Returns missing info errors
    if(!name || (!email && !phoneNumber))
      return res.status(400).send(errors)

    // finds contact in DB
    contact = await Contact.findById(_id)

    // Updated contact info
    contact.updateOne({ name, email, phoneNumber }, (err) => {
      if (err) 
        return res.status(500).send("Error occurred while updating contact info");
      else
        return res.send("Contact Updated");
    });
  })
);

// export router, making contact api's available for use
module.exports = router;
