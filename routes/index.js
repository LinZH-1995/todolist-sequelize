const express = require('express')
const router = express.Router()

const home = require('./modules/home.js')
const users = require('./modules/users.js')
const todos = require('./modules/todos.js')
const auth = require('./modules/auth.js')
const { authenticator } = require('../middleware/auth.js')

router.use('/auth', auth)
router.use('/users', users)
router.use('/todos', authenticator, todos)
router.use('/', authenticator, home)

module.exports = router