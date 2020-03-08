const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create user Schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
});

// export user schema
let User = mongoose.model('users', userSchema);
module.exports = User;