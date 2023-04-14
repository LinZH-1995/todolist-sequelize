const express = require('express')
const router = express.Router()

const db = require('../../models')
const User = db.User

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.create({ name, email, password })
    .then(user => res.redirect('/'))
})

router.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err)

    // req.flash('success_msg', '已成功登出！')
    res.redirect('/users/login')
  })
})

module.exports = router