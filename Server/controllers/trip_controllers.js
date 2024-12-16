const { createTrip, getTrips } = require('../model/tripModel');

const createTripController = async (req, res) => {
  try {
    const { from, to, departureDate, departureTime, arrivalDate, arrivalTime, title, destinationCountry, destinationCity, activities, notes } = req.body;
    const userId = req.user.id; // Assuming the user ID is stored in req.user
    console.log('Authenticated user ID:', userId); // Debug log

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
      activities,
      notes,
      createdBy: userId
    };

    console.log('Trip data:', tripData); // Debug log

    const newTrip = await createTrip(tripData, userId);
    res.status(201).json({ trip: newTrip, message: 'Trip created successfully' });
  } catch (err) {
    console.error('Error creating trip:', err);
    res.status(500).json({ message: 'Failed to create trip' });
  }
};

const fetchTrips = async (req, res) => {
  try {
    const trips = await getTrips();
    res.status(200).json(trips);
  } catch (err) {
    console.error('Error fetching trips:', err);
    res.status(500).json({ message: 'Failed to fetch trips' });
  }
};

module.exports = { createTripController, fetchTrips };