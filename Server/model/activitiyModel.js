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

const createActivity = async (activityData) => {
  try {
    const newActivity = await Activity.create({
      activity_name: activityData.name,
      activity_description: activityData.description,
      venue: activityData.place,
      date: activityData.date,
      time_start: activityData.timeStart,
      time_end: activityData.timeEnd,
    });
    return newActivity;
  } catch (err) {
    console.error('Error creating activity:', err);
    throw err;
  }
};

module.exports = { Activity, createActivity };
