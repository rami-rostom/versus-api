const { User } = require('../models/index');

const controller = {
  getOneUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        include: [
          'role',
          'socials',
          'events',
          'organize',
          'teams',
          'platforms',
          'games',
          'like_users',
          'like_teams'
        ]
      });

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          'error': 'User not found. Please verify the provided id.'
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  updateOneUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          'error': 'User not found. Please verify the provided id.'
        });
      }

      const { username, avatar } = req.body;

      if (username) { user.username = username; }
      if (avatar) { user.avatar = avatar; }

      await user.save();
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  getUserEvents: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          'error': 'User not found. Please verify the provided id.'
        });
      }

      const userEvents = await user.getEvents();

      res.status(200).json(userEvents);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  getUserTeams: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          'error': 'User not found. Please verify the provided id.'
        });
      }

      const userTeams = await user.getTeams();

      res.status(200).json(userTeams);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  }
};

module.exports = controller;