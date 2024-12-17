const { createDestination } = require('../model/destinationModel'); 
const { createActivity } = require('../model/activitiyModel');
const { createDestinationActivities } = require('../model/destinationActivityModel');

const create_destAct_Controller = async (req, res) => {
  try {
    const { from, to, departureDate, departureTime, arrivalDate, arrivalTime, title, destinationCountry, destinationCity, activities } = req.body; 
    const userId = req.user.id; 
    console.log('Authenticated user ID:', userId); 

    if (!from || !to || !departureDate || !departureTime || !arrivalDate || !arrivalTime || !title || !destinationCountry || !destinationCity) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    const tripData = {
      from,
      to,
      departureDate,
      departureTime,
      arrivalDate,
      arrivalTime,
      title,
      destinationCountry,
      destinationCity,
    };
    console.log('Destination data:', tripData);

    const newDestination = await createDestination(tripData);

    if (activities && activities.length > 0) {
      for (const activityData of activities) {
        await createActivityAndLinkToDestination(newDestination.id, activityData);
      }
    }

    res.status(201).json({ Destination: newDestination, message: 'Destination created successfully' });
  } catch (err) {
    console.error('Error creating Destination:', err);
    res.status(500).json({ message: 'Failed to create Destination' });
  }
};

const createActivityAndLinkToDestination = async (destinationId, activityData) => {
  try {
    const newActivity = await createActivity(activityData);
    await createDestinationActivities(destinationId, newActivity.activity_id);
  } catch (err) {
    console.error('Error creating activity and linking to destination:', err);
    throw err;
  }
};

module.exports = { create_destAct_Controller };