const express = require('express')
const router = express.Router()
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })
const { requireOwnership } = require('./../../lib/custom_errors')
// const crypto = require('crypto')
const Review = require('./../models/review')

// create
router.post('/create-review', requireToken, (req, res, next) => {
  Review.create(req.body.review)
    .then(review => {
      res.status(201).json({ review })
    })
    .catch(next)
})

// // index
// router.get('/entries', (req, res, next) => {
//   Review.find()
//     .then(entries => {
//       res.status(200).json({ entries })
//     })
//     .catch(next)
// })
// we deleted the 404 - handle404
// // show
// router.get('/entries/:id', (req, res, next) => {
//   Review.findById(req.params.id)
//     .then(handle404)
//     .then(review => {
//       return res.status(200).json({ review })
//     })
//     .catch(next)
// })

// update
router.patch('/entries/:id', requireToken, (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => {
      requireOwnership(req, review)
      return review.updateOne(req.body.review)
    })
    .then(() => {
      res.sendStatus(204)
    })
    .catch(next)
})

// delete
router.delete('/entries/:id', requireToken, (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => {
      requireOwnership(req, review)
      review.deleteOne()
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
