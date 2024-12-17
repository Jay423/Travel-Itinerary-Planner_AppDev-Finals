const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/databasepg');  
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'users', 
  timestamps: false,   
});

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
};

const registerUser = async (data) => {
    try {
        const newUser = await User.create({
            email: data.email,
            password: data.password,
            first_name: data.first_name,
            last_name: data.last_name,
        });
        return newUser;
    } catch (err) {
        console.error('Error adding user:', err);
        throw err;
    }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (err) {
    console.error('Error finding user by email:', err);
    throw err;
  }
};

sequelize.sync()
  .then(() => console.log('User table has been synchronized'))
  .catch(err => console.error('Error syncing the User table:', err));

module.exports = { registerUser, getAllUsers, findUserByEmail };
