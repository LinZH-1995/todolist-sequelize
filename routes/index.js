const express = require('express')
const router = express.Router()

const home = require('./modules/home.js')
const users = require('./modules/users.js')
const todos = require('./modules/todos.js')
const auth = require('./modules/auth.js')

router.use('/auth', auth)
router.use('/users', users)
router.use('/todos', todos)
router.use('/', home)

module.exports = router