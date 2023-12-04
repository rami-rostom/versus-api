const { eventDataMapper } = require('../dataMapper');

const controller = {
  getAllEvent: async (_, res) => {
    try {
      const events = await eventDataMapper.getAll();

      res.status(200).json(events);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },
  getOneEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await eventDataMapper.getOne(id);

      if (event) {
        res.status(200).json(event);
      } else {
        res.status(404).json({
          'error': 'Event not found. Please verify the provided id.'
        });
      }

      res.status(200).json(event);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  }
};

module.exports = controller;