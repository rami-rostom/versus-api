const { Game } = require('../models/index');

const controller = {
  getAllGames: async (_, res) => {
    const games = await Game.findAll();

    res
      .status(200)
      .json(games);
  }
};

module.exports =  controller;