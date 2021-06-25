'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

// changed
module.exports = commentSchema
