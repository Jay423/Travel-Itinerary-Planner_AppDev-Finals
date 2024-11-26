const { registerUser, getAllUsers } = require('../model/userModel');

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
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const registerUserController = async (req, res) => {
  try {
    const newUser = await registerUser(req.body);
    
    console.log('New User:', newUser.email);

  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ error: 'Failed to add user' });
  }
};

module.exports = { registerUserController, getAllUsersController };
