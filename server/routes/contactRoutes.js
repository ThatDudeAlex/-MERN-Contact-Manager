const express = require("express");
const router = express.Router();

// schemas
const Contact = require("../database/models/Contact");
const User = require("../database/models/User");

// allowes router to parse json data
router.use(express.json());

// error messages for contact routes
const errMessages = {
  noUserId: "no user id found",
  noContactId: "no contact id found",
  invalidCred: "Invalid Email or Password"
};

/**
 * @route	GET  contacts/getAllContacts
 * @desc	gets all contacts for a given user
 * @access	public
 */
router.get("/getAllContacts", (req, res) => {
  const { userId } = req.session

  // checks if user id is provided
  if (!userId) return res.json('no user');

  // querys DB for all contacts belonging to the user
  Contact.find({ userId: userId })
    .then(contacts => {
      return res.json(contacts);
    })
    .catch(err => {
      return res.json(err);
    });
});

/**
 * @route	POST  contacts/addContact
 * @desc	creates a new contact
 * @access	public
 */
router.post("/addContact", (req, res) => {
  const {name, email, phoneNumber} = req.body
  const { userId } = req.session

  // checks if user id is provided
  if (!userId) return res.json('no user');

  if (!name) return res.json('no name');
  if (!email || !phoneNumber) return res.json('no email or phone number')

  // const userId = req.body.userId;

  // create new contact object, to save into DB
  const newContact = new Contact({
    userId, name, email, phoneNumber
  });

  newContact
    .save() // saves contact to DB
    .then(addedContact => res.json({ msg: "New contact added", success: true, newContact: addedContact}))
    .catch(err => {
      res.json(err);
    });
});

/**
 * @route	DELETE  contacts/deleteContact
 * @desc	deletes selected contact
 * @access	public
 */
router.delete("/deleteContact", (req, res) => {
  // checks if user id is provided
  console.log(req.body)

  if (!req.body.contactId) return res.json("no contact id found");

  const contactId = req.body.contactId;

  Contact.findOneAndDelete({ _id: contactId })
    .then(() => {
      return res.json({msg: "contact deleted", success: true, contactId: contactId});
    })
    .catch((err) => {
      return res.json(err);
    });
});

/**
 * @route	PATCH  contacts/editContact
 * @desc	edits selected contact
 * @access	public
 */
router.patch("/editContact", (req, res) => {
  // checks if contact id is provided
  if (!req.body.contactId) 
    res.json(errMessages.noContactId);

  // get data from request body
  const { contactId, firstName, lastName, email, phoneNumber } = req.body;

  // finds contact in DB
  Contact.findOne({ _id: contactId })
    .then(contact => {
      // updates contact with the new info
      contact.updateOne({ firstName, lastName, email, phoneNumber }, err => {
        if (err) 
          res.json(err);

        res.json("contact updated");
      });
    })
    .catch(err => { res.json(err) });
});

// export router, making contact api's available for use
module.exports = router;
