const { Platform } = require('../models/index');

const controller = {
  getAllPlatforms: async (_, res) => {
 
    const platforms = await Platform.findAll();

    res.status(200).json(platforms);
  },
};

module.exports =  controller;