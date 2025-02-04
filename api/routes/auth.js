const router = require('express').Router()
const User = require('./../models/User.js')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    })

    const user = await newUser.save()
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username})
    if (!user) {
      return res.status(400).json({message: 'Wrong Credential'})
    }

    const validated = await bcrypt.compare(req.body.password, user.password)
    if (!validated) {
      return res.status(400).json({message: 'Wrong Credential'})
    }

    const {password, ...others} = user._doc
    res.status(200).json(others)
  } catch (err) {
    res.status(500).json(err)
  }
})
module.exports = router
