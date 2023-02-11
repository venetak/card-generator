const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: { type: String, default: null, required: true },
    password: { type: String, default: null, required: true },
})

const model = mongoose.model('user', UserSchema)

module.exports = model