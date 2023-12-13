const { TypeEvent } = require('../models/index');

const controller = {
  getAllTypesEvent: async (_, res) => {
    try {
      const types = await TypeEvent.findAll();

      res.status(200).json(types);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  }
};

module.exports =  controller;