const mongoose = require('mongoose');
const bcrypt = require("bcryptjs"); // library to help you hash passwords
const Schema = mongoose.Schema;

// create user Schema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        default: '',
        require: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
});

// Adds method that hashes user passwords
userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8, null))
}

// Adds method that validates user password
userSchema.methods.validPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

// export user schema
let User = mongoose.model('users', userSchema);
module.exports = User;