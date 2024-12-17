const { Sequelize } = require('sequelize');
const sequelize = require('../config/databasepg');
const { Destination } = require('../model/destinationModel');
const { Activity } = require('../model/activityModel');
const { DestinationActivity } = require('../model/destinationActivityModel');

Destination.belongsToMany(Activity, {
  through: DestinationActivity,
  foreignKey: 'destination_id',
  otherKey: 'activity_id',
});

Activity.belongsToMany(Destination, {
  through: DestinationActivity,
  foreignKey: 'activity_id',
  otherKey: 'destination_id',
});

module.exports = {
  Destination,
  Activity,
  DestinationActivity,
  sequelize,
};
