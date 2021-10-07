const userRouter = require('express').Router()
const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
/* method get (get all users) */
userRouter.use(cors())

userRouter.use(express.json())
userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (e) {
    console.log(e, '')
  }
})

/* method get (get only user with one ID) */
userRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id
  const productoEncontrado = await User.findById(id)
  if (productoEncontrado) {
    return res.json(productoEncontrado)
  } else {
    res
      .status(404)
      .end()
      .catch(err => next(err))
  }
})

/* method post (register)*/
userRouter.post('/', async (req, res, next) => {
  const {
    email,
    password,
    cargo,
    image,
    names,
    lastNames,
    numberPhone,
    birthday
  } = req.body
  const saltRounds = 10

  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    passwordHash,
    email,
    names,
    lastNames,
    birthday,
    numberPhone,
    cargo,
    image
  })

  try {
    const userSaved = await newUser.save()
    res.json(userSaved)
  } catch (err) {
    next(err)
  }
})

/* method put (update information to user)*/
userRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const {
    email,
    password,
    names,
    cargo,
    image,
    lastNames,
    numberPhone,
    birthday,
    sede
  } = req.body

  const userUpdated = {
    id: id,
    password: password,
    email: email,
    names: names,
    lastNames: lastNames,
    birthday: birthday,
    numberPhone: numberPhone,
    image: image,
    cargo: cargo,
    sede: sede
  }

  User.findByIdAndUpdate(id, userUpdated, { new: true }).then(response =>
    res.json(response)
  )
})

/* method delete (delete the user)*/
userRouter.delete('/:id', async (req, res) => {
  const id = req.params.id

  const userFind = await User.findByIdAndDelete(id)
  if (userFind) {
    res
      .status(202)
      .json({
        status: 'user eliminadooo!!!!'
      })
      .end()
  } else {
    res.status(404).json({ status: 'ese usuario no existe' })
  }
})

module.exports = userRouter
