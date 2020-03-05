const mongoose = require('mongoose');
const Schema = mongoose.schema;

// create Schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true
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