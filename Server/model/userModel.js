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
    try{
        const newUser = await User.create({
            email: data.email,
            password: data.password,
        })
        return newUser;
    } catch (err) {
        console.error('Error adding user:', err);
        throw err;
    }
}

sequelize.sync()
  .then(() => console.log('User table has been synchronized'))
  .catch(err => console.error('Error syncing the User table:', err));

module.exports = { registerUser, getAllUsers };
