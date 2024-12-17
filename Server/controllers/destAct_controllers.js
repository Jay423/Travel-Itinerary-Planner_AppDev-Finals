const { Destination, Activity, DestinationActivity } = require('../associations/associationsEntity');

const create_destAct_Controller = async (req, res) => {
  try {
    const {
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
    } = req.body;

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

    const newDestination = await Destination.create(tripData);
    let activityId = null;

    if (activities && Array.isArray(activities)) {
      for (const activityData of activities) {
        const { name, description, place, date, timeStart, timeEnd } = activityData;

        if (!name || !date || !timeStart || !timeEnd) {
          console.warn(`Skipping activity due to missing required fields: ${JSON.stringify(activityData)}`);
          continue;
        }

        const [activity, created] = await Activity.findOrCreate({
          where: { activity_name: name },
          defaults: {
            activity_description: description || null,
            venue: place || null,
            date,
            time_start: timeStart,
            time_end: timeEnd,
          },
        });

        activityId = activity.id;
      }
    } else {
      console.log('No activities provided, keeping activity_id as null');
    }

    const destinationActivityData = {
      destination_id: newDestination.id,  
      activity_id: activityId, 
    };

    const newDestinationActivity = await DestinationActivity.create(destinationActivityData);
    console.log('DestinationActivity created:', newDestinationActivity);

    res.status(201).json({ Destination: newDestination, message: 'Destination created successfully with activities.' });

  } catch (err) {
    console.error('Error creating Destination:', err);
    res.status(500).json({ message: 'An error occurred while creating the Destination.', error: err.message });
  }
};

const getDestinationByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Destination.findOne({
      where: { id },
      include: [
        {
          model: Activity,
          through: { attributes: [] },
        },
      ],
    });

    if (!trip) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.status(200).json(trip);
  } catch (err) {
    console.error('Error fetching Destination:', err);
    res.status(500).json({ message: 'Failed to fetch Destination' });
  }
};

const updateDestinationController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
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
    } = req.body;

    const destination = await Destination.findOne({ where: { id } });
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    await destination.update({
      from,
      to,
      departureDate,
      departureTime,
      arrivalDate,
      arrivalTime,
      title,
      destinationCountry,
      destinationCity,
    });

    if (activities && Array.isArray(activities)) {
      for (const activityData of activities) {
        const { name, description, place, date, timeStart, timeEnd } = activityData;

        if (!name || !date || !timeStart || !timeEnd) {
          console.warn(`Skipping activity due to missing required fields: ${JSON.stringify(activityData)}`);
          continue;
        }

        const [activity, created] = await Activity.findOrCreate({
          where: { activity_name: name },
          defaults: {
            activity_description: description || null,
            venue: place || null,
            date,
            time_start: timeStart,
            time_end: timeEnd,
          },
        });

        await DestinationActivity.findOrCreate({
          where: { destination_id: id, activity_id: activity.id },
        });
      }
    }

    res.status(200).json({ message: 'Destination updated successfully' });
  } catch (err) {
    console.error('Error updating Destination:', err);
    res.status(500).json({ message: 'Failed to update Destination' });
  }
};

const deleteDestinationActivityAndDestinationIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedActivityCount = await DestinationActivity.destroy({
      where: { destination_id: id }
    });

    const deletedDestinationCount = await Destination.destroy({
      where: { id }
    });

    if (deletedActivityCount === 0 && deletedDestinationCount === 0) {
      return res.status(404).json({ message: 'No Destination or DestinationActivity found with the given destination_id' });
    }

    res.status(200).json({ message: 'Destination and associated activities deleted successfully' });
  } catch (err) {
    console.error('Error deleting Destination and DestinationActivity:', err);
    res.status(500).json({ message: 'Failed to delete Destination and DestinationActivity' });
  }
};

module.exports = { create_destAct_Controller, getDestinationByIdController, updateDestinationController, deleteDestinationActivityAndDestinationIdController };
