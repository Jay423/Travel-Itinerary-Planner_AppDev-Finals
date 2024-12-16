const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/databasepg');
const { createDestinationActivities } = require('./destinationActivityModel'); // Added import

const Trip = sequelize.define('Trip', {
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
  activities: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'Destination', 
  timestamps: true,
});

const createTrip = async (tripData) => {
  try {
    const newTrip = await Trip.create({
      from: tripData.from,
      to: tripData.to,
      departureDate: tripData.departureDate,
      departureTime: tripData.departureTime,
      arrivalDate: tripData.arrivalDate,
      arrivalTime: tripData.arrivalTime,
      title: tripData.title,
      destinationCountry: tripData.destinationCountry,
      destinationCity: tripData.destinationCity,
      activities: tripData.activities,
      notes: tripData.notes,
    });

    await createDestinationActivities(newTrip.id);

    return newTrip;
  } catch (err) {
    console.error('Error creating trip:', err);
    throw err;
  }
};

const getTrips = async () => {
  try {
    const trips = await Trip.findAll();
    return trips;
  } catch (err) {
    console.error('Error fetching trips:', err);
    throw err;
  }
};

sequelize.sync()
  .then(() => console.log('Destination table has been synchronized'))
  .catch(err => console.error('Error syncing the Destination table:', err));

module.exports = { Trip, createTrip, getTrips };