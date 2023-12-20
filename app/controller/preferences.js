const { User } = require('../models/index');

const controller = {
  updateUserPreferedPlatform: async (req, res) => {
    const { id } = req.params;
    const { platform_id } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res
        .status(404)
        .json({ 'error': 'User not found. Please verify the provided id.' });
    }

    // Use Sequelize method to get all favorites platforms of the user
    const userPlatforms = await user.getPlatforms();

    // Remove all platforms from favorites
    await user.removePlatforms(userPlatforms);
    // Add all new platforms to favorite
    await user.addPlatforms(platform_id);

    res
      .status(200)
      .json({ 'message': 'Platform preferences updated.' });
  },

  updateUserPreferedGame: async (req, res) => {
    const { id } = req.params;
    const { game_id } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res
        .status(404)
        .json({ 'error': 'User not found. Please verify the provided id.' });
    }

    // Use Sequelize method to get all favorites games of the user
    const userGames = await user.getGames();

    // Remove all games from favorites
    await user.removeGames(userGames);
    // Add all new games to favorite
    await user.addGames(game_id);

    res
      .status(200)
      .json({ 'message': 'Game preferences updated.' });
  },

  updateUserPreferedEvent: async (req, res) => {
    const { id } = req.params;
    const { event_id } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res
        .status(404)
        .json({ 'error': 'User not found. Please verify the provided id.' });
    }

    // Use Sequelize method to get all favorites events of the user
    const userFollowEvent = await user.getLikeEvents();

    const isFollowed = userFollowEvent.find((event) => event.id === event_id);

    if (!isFollowed) {
      // Use Sequelize method to add a new entry in "user_like_event" table
      await user.addLikeEvents(event_id);

      res
        .status(200)
        .json({ 'message': 'New event followed.' });
    } else {
      // Use Sequelize method to remove an entry from "user_like_event" table
      await user.removeLikeEvents(event_id);
      
      res
        .status(200)
        .json({ 'message': 'Event is now unfollow.' });
    }
  },

  // updateUserPreferedPlatform: async (req, res) => {
  //   TOGGLE
  //   const { id } = req.params;
  //   const { platform_id } = req.body;

  //   const user = await User.findByPk(id);

  //   if (!user) {
  //     return res
  //       .status(404)
  //       .json({ 'error': 'User not found. Please verify the provided id.' });
  //   }

  //   // Use Sequelize method to get all favorites platforms of the user
  //   const userPlatforms = await user.getPlatforms();

  //   for (const platform of platform_id) {
  //     const isPrefered = userPlatforms.find((userPlatform) => userPlatform.id === platform);

  //     if (!isPrefered) {
  //       // Use Sequelize method to add a new entry in "user_like_platform" table
  //       await user.addPlatforms(platform);
  //     } else {
  //       // Use Sequelize method to remove an entry from "user_like_platform" table
  //       await user.removePlatforms(platform);
  //     }
  //   }

  //   res
  //     .status(200)
  //     .json({ 'message': 'Platform preferences updated.' });
  // },

  // updateUserPreferedGame: async (req, res) => {
  //   TOGGLE
  //   const { id } = req.params;
  //   const { game_id } = req.body;

  //   const user = await User.findByPk(id);

  //   if (!user) {
  //     return res
  //       .status(404)
  //       .json({ 'error': 'User not found. Please verify the provided id.' });
  //   }

  //   // Use Sequelize method to get all favorites games of the user
  //   const userGames = await user.getGames();

  //   for (const game of game_id) {
  //     const isPrefered = userGames.find((userGame) => userGame.id === game);

  //     if (!isPrefered) {
  //       // Use Sequelize method to add a new entry in "user_like_game" table
  //       await user.addGames(game);
  //     } else {
  //       // Use Sequelize method to remove an entry from "user_like_game" table
  //       await user.removeGames(game);
  //     }
  //   }

  //   res
  //     .status(200)
  //     .json({ 'message': 'Game preferences updated.' });
  // },
};

module.exports = controller;