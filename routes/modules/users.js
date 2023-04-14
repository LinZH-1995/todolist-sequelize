const bcrypt = require('bcryptjs')
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

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    const user = await User.findOne({ where: { email } })
    if (user) {
      console.log('User already exists')
      return res.render('register', { name, email, password, confirmPassword })
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await User.create({ name, email, password: hash })
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

router.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err)

    // req.flash('success_msg', '已成功登出！')
    res.redirect('/users/login')
  })
})

module.exports = router