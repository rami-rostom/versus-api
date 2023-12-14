const { Platform } = require('../models/index');

const controller = {
  getAllPlatforms: async (_, res) => {
    try {
      const platforms = await Platform.findAll();

      res.status(200).json(platforms);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  }
};

module.exports =  controller;