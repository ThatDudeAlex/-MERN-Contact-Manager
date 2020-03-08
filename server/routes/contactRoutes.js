const express = require("express");
const passport = require("passport"); // authentication library
const router = express.Router();

// schemas
const Contact = require("../models/Contact");
const User = require("../models/User");

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
  // checks if user id is provided
  if (!req.body.userId) res.json(errMessages.noUserId);

  const userId = req.body.userId;

  // querys DB for all contacts belonging to the user
  Contact.find({ userId: userId })
    .then(contacts => {
      res.json(contacts);
    })
    .catch(err => {
      res.json(err);
    });
});

/**
 * @route	POST  contacts/addContact
 * @desc	creates a new contact
 * @access	public
 */
router.post("/addContact", (req, res) => {
  // checks if user id is provided
  if (!req.body.userId) res.json(errMessages.noUserId);

  const userId = req.body.userId;

  // create new contact object, to save into DB
  const newContact = new Contact({
    userId: userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  });

  newContact
    .save() // saves contact to DB
    .then(() => res.json({ msg: "New contact added", success: true }))
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
  if (!req.body.contactId) res.json("no contact id found");

  const contactId = req.body.contactId;

  Contact.findOneAndDelete({ _id: contactId })
    .then(() => {
      res.json("contact deleted");
    })
    .catch(() => {
      res.json("error while deleting contact");
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
