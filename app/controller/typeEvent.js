const { TypeEvent } = require('../models/index');

const controller = {
  getAllTypesEvent: async (_, res) => {
    const types = await TypeEvent.findAll();

    res.status(200).json(types);
  }
};

module.exports =  controller;