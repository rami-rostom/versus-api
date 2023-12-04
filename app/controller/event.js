const { eventDataMapper } = require('../dataMapper');

const controller = {
  getAllEvent: async (_, res) => {
    try {
      const events = await eventDataMapper.getAll();
      res.status(200).json(events);
    } catch (error) {
      console.log(error);
    }
  },
  getOneEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await eventDataMapper.getOne(id);
      res.status(200).json(event);
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = controller;