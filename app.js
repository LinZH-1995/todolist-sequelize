const express = require('express')
const exphbs = require('express-handlebars')
const expSession = require('express-session')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const app = express()
const port = 3000

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(expSession({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`Now Server is working on localhost:${port}`)
})