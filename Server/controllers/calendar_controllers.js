const { Destination, Activity } = require('../associations/associationsEntity');

const getUpcomingTripsController = async (req, res) => {
  try {
    const Destination_Plan = await Destination.findAll({
      include: [
        {
          model: Activity,
          through: { attributes: [] },
        },
      ],
    });

    res.status(200).json(Destination_Plan);
  } catch (err) {
    console.error('Error fetching trips:', err);
    res.status(500).json({ message: 'Failed to fetch trips' });
  }
};

module.exports = { getUpcomingTripsController };
