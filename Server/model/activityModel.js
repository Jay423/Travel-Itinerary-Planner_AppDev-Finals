const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/databasepg');

const Activity = sequelize.define('Activity', {
  activity_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  activity_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activity_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  venue: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time_start: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  time_end: {
    type: DataTypes.TIME,
    allowNull: false,
  },
}, {
  tableName: 'Activity',
  timestamps: false,
});

sequelize.sync()
  .then(() => console.log('Activity table has been synchronized'))
  .catch(err => console.error('Error syncing the Activity table:', err));

module.exports = { Activity };
