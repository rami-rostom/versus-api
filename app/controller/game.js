const { Game } = require('../models/index');

const controller = {
  getAllGames: async (_, res) => {
    try {
      const games = await Game.findAll();

      res.status(200).json(games);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  }
};

module.exports =  controller;