const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    firstName: {
       type: String,
       required: true
   },
   lastName: {
       type: String,
       required: false
   },
   email: {
       type: String,
       required: false
   },
   phoneNumber: {
    type: String,
    required: true
   }
});

let Contact = mongoose.model('contacts', contactSchema);
module.exports = Contact;