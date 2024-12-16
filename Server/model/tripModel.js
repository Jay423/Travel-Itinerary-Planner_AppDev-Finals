const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/databasepg');

const Trip = sequelize.define('Trip', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  from: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  to: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departureDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  departureTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  arrivalDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  arrivalTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destinationCountry: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destinationCity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activities: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'trips',
  timestamps: true,
});

const createTrip = async (tripData, userId) => {
  try {
    console.log('Creating trip with userId:', userId); // Debug log
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
      createdBy: userId,
    });
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
  .then(() => console.log('Trip table has been synchronized'))
  .catch(err => console.error('Error syncing the Trip table:', err));

module.exports = { createTrip, getTrips };