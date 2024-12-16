const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/databasepg');

const DestinationActivity = sequelize.define('DestinationActivity', {
  destination_activity_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tripModel_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Destination',
      key: 'id',
    },
    allowNull: false,
  },
}, {
  tableName: 'Destination_Activities',
  timestamps: false,
});

const createDestinationActivities = async (tripModelId) => {
  try {
    console.log('Creating destination activities for trip:', tripModelId);
    const destinationActivity = {
      tripModel_id: tripModelId,
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
