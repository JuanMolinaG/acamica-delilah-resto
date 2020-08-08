const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  registerValidation,
  loginValidation,
} = require('../helpers/usersDataValidation');
const { getUserBy } = require('../helpers/users.querys');
const { getOrderBy } = require('../helpers/orders.querys');

// Validate registration data
const registerIsValid = async (req, res, next) => {
  // Validate the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Check if username already exist
  const userByUsername = await getUserBy('username', req.body.username);
  if (userByUsername)
    return res.status(400).json({ error: 'Username already exists' });

  // Check if email already exist
  const userByEmail = await getUserBy('email', req.body.email);
  if (userByEmail)
    return res.status(400).json({ error: 'Email already exists' });

  next();
};

// Validate login data
const loginIsValid = async (req, res, next) => {
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

  req.user = user;

  next();
};

// Validate token
const tokenIsValid = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ error: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token or expired' });
  }
};

// Validate if user is admin
const userIsAdmin = async (req, res, next) => {
  const userId = req.user.id;

  // Check if user is admin
  const userById = await getUserBy('id', userId);
  if (userById.role_id !== 1)
    return res
      .status(403)
      .json({ error: 'You do not have permissions to make this action' });
  next();
};

// Validate if user is admin or buyer
const userIsAdminOrBuyer = async (req, res, next) => {
  const userId = req.user.id;

  // Check if user is admin
  const userById = await getUserBy('id', userId);
  if (userById.role_id !== 1) {
    const orderId = req.params.orderId;

    const orderById = await getOrderBy('id', orderId);

    if (orderById.userId !== userId)
      return res
        .status(403)
        .json({ error: 'You only can see your own orders' });
  }
  next();
};

module.exports = {
  tokenIsValid,
  userIsAdmin,
  registerIsValid,
  loginIsValid,
  userIsAdminOrBuyer,
};
