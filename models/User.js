const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: String, required: true },
    role: { type: String, required: true},
})

module.exports = mongoose.model('User', UserSchema);