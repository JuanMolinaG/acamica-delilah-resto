const { request } = require('express');

const router = require('express').Router();
const UsersModel = require('../models/Users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
  registerValidation,
  loginEmailValidation,
} = require('../helpers/dataValidation');

router.post('/register', async (req, res) => {
  // Validate the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  return res.send('Register');
});

module.exports = router;
