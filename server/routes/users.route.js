const router = require('express').Router();
const Users = require('../models/Users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
  registerValidation,
  loginValidation,
} = require('../helpers/dataValidation');
const { getUserBy } = require('../helpers/users.querys');

router.post('/register', async (req, res) => {
  // Validate the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Check if email already exist
  const userByEmail = await getUserBy('email', req.body.email);
  if (userByEmail)
    return res.status(400).json({ error: 'Email already exists' });

  // Check if username already exist
  const userByUsername = await getUserBy('username', req.body.username);
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

router.post('/login', async (req, res) => {
  // Validate the data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Check if user exist
  let user;
  user = await getUserBy('email', req.body.username_email);
  if (!user) {
    user = await getUserBy('username', req.body.username_email);
    if (!user)
      return res
        .status(400)
        .json({ error: 'Email/Username or Password wrong' });
  }

  // Check password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).json({ error: 'Email/Username or Password wrong' });

  // Create and return token
  const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).json({ token: token, type: 'Bearer' });
});
module.exports = router;
