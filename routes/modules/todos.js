const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', async (req, res) => {
  try {
    const UserId = req.user.id
    const name = req.body.name
    await Todo.create({ name, UserId })
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const UserId = req.user.id
    const id = req.params.id
    const todo = await Todo.findOne({ where: { UserId, id }})
    res.render('detail', { todo: todo.toJSON() })
  } catch (err) {
    console.log(err)
  }
})

router.get('/:id/edit', async (req, res) => {
  try {
    const UserId = req.user.id
    const id = req.params.id
    const todo = await Todo.findOne({ where: { UserId, id } })
    res.render('edit', { todo: todo.toJSON() })
  } catch (err) {
    console.log(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const UserId = req.user.id
    const id = req.params.id
    const { name, isDone } = req.body
    const todo = await Todo.findOne({ where: { UserId, id } })
    Object.assign(todo, { name, isDone: isDone === 'on'})
    await todo.save()
    res.redirect(`/todos/${id}`)
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const UserId = req.user.id
    const id = req.params.id
    await Todo.destroy({ where: { UserId, id } })
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})


module.exports = router