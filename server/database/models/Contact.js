const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create contact schema
const contactSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
       type: String,
       required: true
   },
   email: {
       type: String,
       required: false
   },
   phoneNumber: {
    type: String,
    required: false
   }
});

// export contact schema
let Contact = mongoose.model('contacts', contactSchema);
module.exports = Contact;