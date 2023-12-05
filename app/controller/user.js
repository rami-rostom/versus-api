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
  }
};

module.exports = controller;