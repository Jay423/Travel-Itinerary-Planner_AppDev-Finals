const { registerUser, getAllUsers } = require('../model/userModel');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const validRegistration = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers(); 

    users.forEach(user => {
      console.log('ID:', user.id);
      console.log('Email:', user.email);
      console.log('Password:', user.password);
    });

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json({ users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

const registerUserController = async (req, res) => {
  try {
    console.log('Incoming request body:', req.body);

    const result = validRegistration.validate(req.body); 
      if (result.error) {
        return res.status(400).json({ message: result.error.details[0].message });
      }

    const { email, password } = req.body;

    const users = await getAllUsers();
    const emailExists = users.find(user => user.email === email);
      if (emailExists) {
        return res.status(400).json({ message: 'Email already exists' });
      }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await registerUser({
      email,
      password: hashedPassword,
    });
    console.log(`User successfully registered: ${newUser.email}`);

    return res.status(201).json({ user: newUser, message: 'Registered Successfully' });

  } catch (err) {
    console.error('Error adding user:', err);
    return res.status(500).json({ message: 'Failed to add user' });
  }
};


module.exports = { registerUserController, getAllUsersController };
