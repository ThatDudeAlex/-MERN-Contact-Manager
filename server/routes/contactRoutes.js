const express = require("express");
const router = express.Router();

// schemas
const Contact = require("../database/models/Contact");

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

    // checks if user id is provided
    if (!userId) return res.json({ success: false, msg: "no user" });
    if (!name) return res.json({ success: false, msg: "no name" });
    if (!email && !phoneNumber) 
      return res.json({ success: false, msg: "no email or phone number" });

    // create new contact object, to save into DB
    const newContact = new Contact({
      userId,
      name,
      email,
      phoneNumber,
    })

    await newContact.save() // saves contact to DB
    return res.json({ msg: "New contact added", success: true, newContact })
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

    // checks if contact info is provided
    if (!req.body._id)
      return res.json({ success: false, msg: "invalid contact id" });
    if (!name) return res.json({ success: false, msg: "no name" });
    if (!email && !phoneNumber)
      return res.json({ success: false, msg: "no email or phone number" });

    // finds contact in DB
    contact = await Contact.findById(_id)

    // updates contact with the new info
    // contact.name = name;
    // contact.email = email;
    // contact.phoneNumber = phoneNumber;
    
    contact.updateOne({ name, email, phoneNumber }, (err) => {
      if (err) 
        return res.json({ msg: err, success: false });
      else
        return res.json({ msg: "contact updated", success: true });
    });
  })
);

// export router, making contact api's available for use
module.exports = router;
