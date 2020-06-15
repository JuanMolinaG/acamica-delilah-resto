const { request } = require('express');
const router = require('express').Router();
const Users = require('../models/Users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
  registerValidation,
  loginEmailValidation,
} = require('../helpers/dataValidation');
const { emailExist, usernameExist } = require('../helpers/usersValidation');

router.post('/register', async (req, res) => {
  // Validate the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Check if email already exist
  const userByEmail = await emailExist(req.body.email);
  if (userByEmail)
    return res.status(400).json({ error: 'Email already exists' });

  // Check if username already exist
  const userByUsername = await usernameExist(req.body.username);
  if (userByUsername)
    return res.status(400).json({ error: 'Username already exists' });

  // Create a hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create the new user
  const user = {
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    password: hashedPassword,
  };

  Users.create(user).then((savedUser) => {
    res.send(savedUser);
  });
});

module.exports = router;
