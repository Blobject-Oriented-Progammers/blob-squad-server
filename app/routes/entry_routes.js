const express = require('express')
const router = express.Router()
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })
const {
  requireOwnership,
  handle404 } = require('./../../lib/custom_errors')
// const crypto = require('crypto')
const Entry = require('./../models/entry')

// create
router.post('/create-entry', requireToken, (req, res, next) => {
  Entry.create(req.body.entry)
    .then(entry => {
      res.status(201).json({ entry })
    })
    .catch(next)
})

// index
router.get('/entries', (req, res, next) => {
  Entry.find().populate('owner').populate('comment.author')
    .then(entries => {
      res.status(200).json({ entries })
    })
    .catch(next)
})

// show
router.get('/entries/:id', (req, res, next) => {
  Entry.findById(req.params.id).populate('owner').populate('comment.author')
    .then(handle404)
    .then(entry => {
      return res.status(200).json({ entry })
    })
    .catch(next)
})

// update
router.patch('/entries/:id', requireToken, (req, res, next) => {
  Entry.findById(req.params.id)
    .then(entry => {
      requireOwnership(req, entry)
      return entry.updateOne(req.body.entry)
    })
    .then(() => {
      res.sendStatus(204)
    })
    .catch(next)
})

// delete
router.delete('/entries/:id', requireToken, (req, res, next) => {
  Entry.findById(req.params.id)
    .then(entry => {
      requireOwnership(req, entry)
      entry.deleteOne()
    })
    .then(() => {
      res.sendStatus(204)
    })
    .catch(next)
})

// BadParamsError,
// BadCredentialsError,
// editing for new commit on correct branch

module.exports = router
