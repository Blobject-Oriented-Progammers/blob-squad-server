const express = require('express')
const router = express.Router()
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })
const { requireOwnership } = require('./../../lib/custom_errors')
// const crypto = require('crypto')
const Entry = require('./../models/entry')

// create
router.post('/comments', requireToken, (req, res, next) => {
  req.body.comment.owner = req.user.id
  const commentData = req.body.comment
  const entryId = commentData.entryId

  Entry.findById(entryId)
    .then(entry => {
      console.log(entry)
      entry.comments.push(commentData) // comments = our child array on Entry model
      return entry.save()
    })
    .then(entry => res.status(201).json({ entry }))
    .catch(next)
})

// DELETE /comments/:id
router.delete('/comments/:id', requireToken, (req, res, next) => {
  // extract the comment's id from the url
  req.body.comment.owner = req.user.id
  const commentId = req.params.id
  console.log('user is ', req.user)
  // extract the entry's id from the incoming request's data
  const commentData = req.body.comment
  const entryId = commentData.entryId
  // Find entry by ID
  Entry.findById(entryId)
  // select the comment subdocument with the id `commentId`
    .then(entry => {
      // then remove it (delete it)
      const myComment = entry.comments.id(commentId)
      console.log('myComment: ', myComment)
      requireOwnership(req, myComment)
      myComment.remove()
      // save our deletion
      return entry.save()
    })
    // if successfully deleted, respond with 204 No Content
    .then(() => res.sendStatus(204))
    .catch(next)
})

// PATCH /comments/:id
router.patch('/comments/:id', requireToken, (req, res, next) => {
  req.body.comment.owner = req.owner
  // extract the comment's id from the url
  const commentId = req.params.id
  // extract the entry's id from the incoming request's data
  const entryId = req.body.comment.entryId
  // extract the comment from the request's data (body)
  const commentData = req.body.comment

  // Find entry by ID
  Entry.findById(entryId)
    // select the comment subdocument with the id `commentId`
    .then(entry => {
      // select the comment with the id  `commentId`
      const comment = entry.comments.id(commentId)
      // update our comment, with the request's data (commentData)

      comment.set(commentData)
      // save our changes, by saving the entry
      return entry.save()
    })
    // if successfully, respond with 204 No Content
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
