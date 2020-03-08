const express = require("express");
const passport = require("passport");
const router = express.Router();

// schemas
const Contact = require("../models/Contact");
const User = require("../models/User");

router.use(express.json());

router.get("/getAllContacts", (req, res) => {
  if (!req.body.userId) res.json("no user id found");

  const userId = req.body.userId;

  Contact.find({ userId: userId })
    .then(contacts => {
      res.json(contacts);
    })
    .catch(() => {
      res.json("error getting all contacts");
    });
});

router.post("/addContact", (req, res) => {
  if (!req.body.userId) res.json("no user id found");

  const userId = req.body.userId;
  const newContact = new Contact({
    userId: userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  });

  newContact.save().then(Contact => {
    const contactId = Contact._id;

    User.updateOne({ _id: userId }, { $addToSet: { contacts: contactId } })
      .then(() => {
        res.json("contact succesfully added");
      })
      .catch(err => {
        res.json(err);
      });
  });
});

router.delete("/deleteContact", (req, res) => {
  if (!req.body.contactId)
    res.json("no user id  or contact id found");

  const contactId = req.body.contactId;

  Contact.findOneAndDelete({_id: contactId})
    .then(() => {
        res.json("contact deleted");
    })
    .catch(() => {
      res.json("error while deleting contact");
    });
});

router.patch('/editContact', (req, res) => {
    if(!req.body.contactId)
        res.json('contact id not found')

    const {
        contactId,
        firstName,
        lastName,
        email,
        phoneNumber 
    } = req.body

    Contact.findOne({_id: contactId})
    .then(contact => {
        contact.updateOne({firstName, lastName, email, phoneNumber}, (err) => {
            if(err)
                res.json(err)

            res.json('contact updated')
        })
    })
    .catch((err) => {
        res.json(err)
    })

})

module.exports = router;
