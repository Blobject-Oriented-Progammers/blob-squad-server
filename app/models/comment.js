'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
})

// changed
module.exports = commentSchema
