const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
});

let User = mongoose.model('users', userSchema);
module.exports = User;