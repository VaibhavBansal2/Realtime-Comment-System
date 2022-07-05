const mongoose = require('mongoose')

const Schema = new Schema({
    username: { type: String, required: true },
    comment: { type: String, required: true }
}, { timestamps: true })

const Comment = mongoose.model('comment', commentSchema)

module.exports = Comment