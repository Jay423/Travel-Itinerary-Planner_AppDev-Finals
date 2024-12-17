const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/databasepg');

const DestinationActivity = sequelize.define('DestinationActivity', {
  destination_activity_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  destination_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Destination',
      key: 'id',
    },
    allowNull: false,
  },
  activity_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Activity',
      key: 'activity_id',
    },
    allowNull: true, // Allow NULL values
  },
}, {
  tableName: 'Destination_Activities',
  timestamps: false,
});

const createDestinationActivities = async (destinationModelId, activityId) => {
  try {
    const destinationActivity = {
      destination_id: destinationModelId,
      activity_id: activityId,
    };
    await DestinationActivity.create(destinationActivity);
  } catch (err) {
    console.error('Error creating destination activities:', err);
    throw err;
  }
};

sequelize.sync()
  .then(() => console.log('DestinationActivity table has been synchronized'))
  .catch(err => console.error('Error syncing the DestinationActivity table:', err));

module.exports = { DestinationActivity, createDestinationActivities };
