const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title:1, author:1, url:1 })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (!body.password || body.password.length < 3 || !body.username || body.username.length < 3) {
    response.status(400).send({ error: 'password and/or username should be longer' })
  } else {
    try {
      const body = request.body

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)

      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
      })

      const savedUser = await user.save()

      response.json(savedUser)
    } catch (exception) {
      next(exception)
    }
  }
})

module.exports = usersRouter