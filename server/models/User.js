const mongoose = require('mongoose');
const userContacts = require('./Contact');
const Schema = mongoose.Schema;


// create Schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

let User = mongoose.model('users', userSchema);
module.exports = User;