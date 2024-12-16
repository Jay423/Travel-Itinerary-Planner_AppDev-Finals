const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../model/userModel');

const authToken = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  console.log('Token received:', token); // Debug log
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Debug log
    const user = await findUserByEmail(decoded.email);

    if (!user) {
      throw new Error();
    }

    req.user = { id: user.id, email: user.email }; // Set the user in the request with id and email
    console.log('Authenticated user:', req.user); // Debug log
    next();
  } catch (err) {
    console.error('Error in authToken middleware:', err); // Debug log
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authToken;
