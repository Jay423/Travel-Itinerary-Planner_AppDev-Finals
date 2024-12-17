const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/databasepg');

const Activity = sequelize.define('Activity', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  activity_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activity_description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  venue: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  time_start: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  time_end: {
    type: DataTypes.TIME,
    allowNull: true,
  },
}, {
  tableName: 'Activities',
  timestamps: false,
});

sequelize.sync()
  .then(() => console.log('Activity table has been synchronized'))
  .catch(err => console.error('Error syncing the Activity table:', err));

module.exports = { Activity };
