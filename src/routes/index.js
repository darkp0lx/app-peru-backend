const router = Router()

router.use(express.json())

router.get('/', (req, res) => {
  res.json({ message: 'hola mundo' })
})

/* method get (get all users) */
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (e) {
    console.log(e)
  }
})

/* method get (get only user with one ID) */
router.get('/api/users/:id', async (req, res, next) => {
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
router.post('/api/users', async (req, res, next) => {
  const { email, password, names, lastNames, numberPhone, birthday } = req.query
  const newUser = new User({
    password: password,
    email: email,
    names: names,
    lastNames: lastNames,
    birthday: birthday,
    numberPhone: numberPhone
  })

  try {
    console.log(newUser, 'userNews')
    const userSaved = await newUser.save()
    res.json(userSaved)
  } catch (err) {
    next(err)
  }
})

/* method put (update information to user)*/
router.put('/api/users/:id', async (req, res) => {
  const id = req.params.id
  const {
    email,
    password,
    names,
    cargo,
    image,
    lastNames,
    numberPhone,
    birthday
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
    cargo: cargo
  }
  console.log(userUpdated, 'update')
  User.findByIdAndUpdate(id, userUpdated, { new: true }).then(response =>
    res.json(response)
  )
})

/* method put (delete the user)*/
router.delete('/api/users/:id', async (req, res) => {
  const id = req.params.id

  const userFind = await User.findByIdAndDelete(id)
  if (userFind) {
    res
      .status(202)
      .json({
        status: 'user eliminado!!!!'
      })
      .end()
  } else {
    res.status(404).json({ status: 'ese usuario no existe' })
  }
})

module.exports = router
