const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../model/userModel');

const authToken = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserByEmail(decoded.email);

    if (!user) {
      throw new Error();
    }

    req.user = { id: user.id, email: user.email }; 
    next();
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authToken;
