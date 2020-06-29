const router = require('express').Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  registerIsValid,
  loginIsValid,
} = require('../middlewares/users.middleware');

router.post('/register', registerIsValid, async (req, res) => {
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

  User.create(user).then((savedUser) => {
    res.send(savedUser);
  });
});

router.post('/login', loginIsValid, async (req, res) => {
  // Create and return token
  const token = jwt.sign({ id: req.user.id }, process.env.TOKEN_SECRET, {
    // expiresIn: '24h',
  });
  res.header('auth-token', token).json({ token: token, type: 'Bearer' });
});
module.exports = router;
