require('dotenv').config()
const bcrypt = require('bcrypt')
const express = require('express')
const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

loginRouter.use(express.json())

loginRouter.post('/', async (req, res) => {
  const { email, password } = req?.body

  const user = await User.findOne({ email })

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    res.status(401).json({
      error: 'invaldid user or passsword'
    })
  }
  const userForToken = {
    id: user._id,
    email: user.email
  }
  const token = jwt.sign(userForToken, 'develop', {
    expiresIn: 60 * 60 * 24 * 7
  })

  res.send({ id: user.id, email: user.email, token }).end()
})

module.exports = loginRouter
