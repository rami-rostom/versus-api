const { User } = require('../models/index');

const controller = {
  updateUserPreferedPlatform: async (req, res) => {
    try {
      const { id } = req.params;
      const { platform_id } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          'error': 'User not found. Please verify the provided id.'
        });
      }

      const userPlatforms = await user.getPlatforms();

      const isPrefered = userPlatforms.find((platform) => platform.id === platform_id);

      if (!isPrefered) {
        await user.addPlatforms(platform_id);
        res.json({ message: 'New favorite platform updated.' });
      } else {
        await user.removePlatforms(platform_id);
        res.json({ message: 'Platform removed from favorites.' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  updateUserPreferedGame: async (req, res) => {
    try {
      const { id } = req.params;
      const { game_id } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          'error': 'User not found. Please verify the provided id.'
        });
      }

      const userGames = await user.getGames();

      const isPrefered = userGames.find((game) => game.id === game_id);

      if (!isPrefered) {
        await user.addGames(game_id);
        res.json({ message: 'New favorite game updated.' });
      } else {
        await user.removeGames(game_id);
        res.json({ message: 'Game removed from favorites.' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  }
};

module.exports = controller;