const { registerUser, getAllUsers, getUserById } = require('../model/userModel');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const validRegistration = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
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

    const { email, password, first_name, last_name } = req.body;
    const users = await getAllUsers();

    const emailExists = users.find(user => user.email === email);
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    else if(!emailFormat.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await registerUser({
      email,
      password: hashedPassword,
      first_name,
      last_name,
    });
    console.log(`User successfully registered: ${newUser.email}`);

    return res.status(201).json({ user: newUser, message: 'Registered Successfully' });

  } catch (err) {
    console.error('Error adding user:', err);
    return res.status(500).json({ message: 'Failed to add user' });
  }
};

const loginUserController = async (req, res) => {
  try {
    console.log('Incoming request body:', req.body);

    const { email, password } = req.body;

    const users = await getAllUsers();
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated token:', accessToken);

    res.status(200).json({ token: accessToken, message: 'Login successful' });

  } catch (err) {
    console.error('Error logging in:', err);
    return res.status(500).json({ message: 'Failed to log in' });
  }
};

const fetchUserProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userProfile = await getUserById(req.user.id);
    if (!userProfile) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(userProfile); 
    console.log('User Profile:', userProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { first_name, last_name, email, number, birthday, gender, password } = req.body;

    const user = await getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.number = number;
    user.birthday = birthday;
    user.gender = gender;

    if (password && password !== user.password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({ message: 'User profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyPassword = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { currentPassword } = req.body;
    const user = await getUserById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ valid: false });
    }

    res.json({ valid: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  getAllUsersController,
  fetchUserProfile,
  updateUserProfile,
  verifyPassword
};
