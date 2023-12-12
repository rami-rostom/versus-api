const { User } = require('../models/index');

const controller = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();

      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

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
          'followers',
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
  },

  followUser: async (req, res) => {
    try {
      // User who wants to follow
      const { user_id } = req.body;

      // User to follow
      const { id } = req.params;

      const userFollower = await User.findByPk(user_id);
      const userToFollow = await User.findByPk(id);

      if (!userToFollow) {
        return res.status(404).json({
          'error': 'User not found. Please verify the provided id.'
        });
      }

      await userToFollow.addFollowing(userFollower, {
        through: { user_liked_id: user_id }
      });
      res.status(200).json({ message: 'User followed successfully.' });
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  unfollowUser: async (req, res) => {
    try {
      // User who wants to unfollow
      const { user_id } = req.body;

      // User to unfollow
      const { id } = req.params;

      const userFollower = await User.findByPk(user_id);
      const userToUnfollow = await User.findByPk(id);

      if (!userToUnfollow) {
        return res.status(404).json({
          'error': 'User not found. Please verify the provided id.'
        });
      }

      await userToUnfollow.removeFollowing(userFollower, {
        through: { user_liked_id: user_id }
      });
      res.status(200).json({ message: 'User unfollowed successfully.' });
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  }
};

module.exports = controller;