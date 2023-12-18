const { User } = require('../models/index');

const controller = {
  updateUserPreferedPlatform: async (req, res) => {
   
    const { id } = req.params;
    const { platform_id } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        'error': 'User not found. Please verify the provided id.'
      });
    }

    const userPlatforms = await user.getPlatforms();

    for (const platform of platform_id) {
      const isPrefered = userPlatforms.find((userPlatform) => userPlatform.id === platform);

      if (!isPrefered) {
        await user.addPlatforms(platform);
      } else {
        await user.removePlatforms(platform);
      }
    }

    res.json({ message: 'Platform preferences updated.' });
  },

  updateUserPreferedGame: async (req, res) => {
  
    const { id } = req.params;
    const { game_id } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        'error': 'User not found. Please verify the provided id.'
      });
    }

    const userGames = await user.getGames();

    for (const game of game_id) {
      const isPrefered = userGames.find((userGame) => userGame.id === game);

      if (!isPrefered) {
        await user.addGames(game);
      } else {
        await user.removeGames(game);
      }
    }

    res.json({ message: 'Game preferences updated.' });
  },

  updateUserPreferedEvent: async (req, res) => {
 
    const { id } = req.params;
    const { event_id } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        'error': 'User not found. Please verify the provided id.'
      });
    }

    const userFollowEvent = await user.getLikeEvents();

    const isFollowed = userFollowEvent.find((event) => event.id === event_id);

    if (!isFollowed) {
      await user.addLikeEvents(event_id);
      res.json({ message: 'New event followed.' });
    } else {
      await user.removeLikeEvents(event_id);
      res.json({ message: 'Event is now unfollow.' });
    }
  },
};

module.exports = controller;