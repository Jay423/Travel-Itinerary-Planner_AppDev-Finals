const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/databasepg');
const { createDestinationActivities } = require('./destinationActivityModel');

const Destination = sequelize.define('Destination', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  from: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  to: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  departureDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  departureTime: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  arrivalDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  arrivalTime: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  destinationCountry: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  destinationCity: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {
  tableName: 'Destination',
  timestamps: true,
});

const createDestination = async (tripData) => {
  try {
    const newTrip = await Destination.create({
      from: tripData.from,
      to: tripData.to,
      departureDate: tripData.departureDate,
      departureTime: tripData.departureTime,
      arrivalDate: tripData.arrivalDate,
      arrivalTime: tripData.arrivalTime,
      title: tripData.title,
      destinationCountry: tripData.destinationCountry,
      destinationCity: tripData.destinationCity,
    });

    return newTrip;
  } catch (err) {
    console.error('Error creating trip:', err);
    throw err;
  }
};

sequelize.sync()
  .then(() => console.log('Destination table has been synchronized'))
  .catch(err => console.error('Error syncing the Destination table:', err));

module.exports = { Destination, createDestination };