const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    timestamp: { type: Number, default: Date.now },
    // category: String
})

const model = mongoose.model('image', ImageSchema)

module.exports = model
