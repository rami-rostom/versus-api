const dataMapper = require('../models/dataMapper');

const mainController = {
  renderAllEvents: async (_, res) => {
    try {
      const events = await dataMapper.getAllEvents();
      res.status(200).json(events);
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = mainController;