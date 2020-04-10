const express = require("express");
const router = express.Router();
const isAuthenticated = require('../auth')

// schemas
const Contact = require("../database/models/Contact");

// allowes router to parse json data
router.use(express.json());

/**
 * @route	GET  contacts/getAllContacts
 * @desc	gets all contacts for a given user
 * @access	public
 */
router.get("/getAllContacts", (req, res) => {
  const { userId } = req.session;

  // checks if user id is provided
  if (!userId) return res.json({success:false, msg:"no user"});

  // querys DB for all contacts belonging to the user
  Contact.find({ userId: userId })
    .then((contacts) => {
      return res.json({success:true, contacts:contacts});
    })
    .catch((err) => {
      return res.json({success:false, msg:err});
    });
});

/**
 * @route	POST  contacts/addContact
 * @desc	creates a new contact
 * @access	public
 */
router.post("/addContact", (req, res) => {
  const { name, email, phoneNumber } = req.body;
  const { userId } = req.session;

  // checks if user id is provided
  if (!userId) return res.json({success:false, msg:"no user"});

  if (!name) return res.json({success:false, msg:"no name"});
  if (!email && !phoneNumber) return res.json({success:false, msg:"no email or phone number"});
  
  // const userId = req.body.userId;

  // create new contact object, to save into DB
  const newContact = new Contact({
    userId,
    name,
    email,
    phoneNumber,
  });

  newContact
    .save() // saves contact to DB
    .then((addedContact) =>
      res.json({
        msg: "New contact added",
        success: true,
        newContact: addedContact,
      })
    )
    .catch((err) => {
      res.json(err);
    });
});

/**
 * @route	DELETE  contacts/deleteContact
 * @desc	deletes selected contact
 * @access	public
 */
router.delete("/deleteContact", (req, res) => {
  // console.log(req.body)
  // checks if user id is provided
  if (!req.body.contactId) return res.json("no contact id found");

  const contactId = req.body.contactId;
  Contact.findOneAndDelete({ _id: contactId })
    .then(() => {
      return res.json({
        msg: "contact deleted",
        success: true,
        contactId: contactId,
      });
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
  // get data from request body
  const { contactId, name, email, phoneNumber } = req.body;
  
  // checks if contact info is provided
  if (!req.body.contactId) return res.json({success:false, msg:'invalid contact id'});
  if (!name) return res.json({success:false, msg:"no name"});
  if (!email && !phoneNumber) return res.json({success:false, msg:"no email or phone number"});

  // finds contact in DB
  Contact.findById(contactId)
    .then((contact) => {
      // updates contact with the new info
      contact.name = name;
      contact.email = email;
      contact.phoneNumber = phoneNumber;

      contact.updateOne({ name, email, phoneNumber }, (err) => {
        if (err) return res.json({msg:err, success:false});

        return res.json({msg:"contact updated", success:true});
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

// export router, making contact api's available for use
module.exports = router;
