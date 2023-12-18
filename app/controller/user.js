const { User } = require('../models/index');

const controller = {
  getAllUsers: async (req, res) => {
   
    const users = await User.findAll();

    res.status(200).json(users);
  },

  getOneUser: async (req, res) => {
    
    const { idOrSlug } = req.params;
    const isId = !isNaN(idOrSlug);

    let user;

    if (isId) {
      user = await User.findByPk(idOrSlug, {
        include: [
          'role',
          'socials',
          'events',
          'organize',
          'teams',
          'platforms',
          'games',
          'followers',
          'like_teams',
          'likeEvents'
        ]
      });
    } else {
      user = await User.findOne({
        where: { username_slug: idOrSlug },
        include: [
          'role',
          'socials',
          'events',
          'organize',
          'teams',
          'platforms',
          'games',
          'followers',
          'like_teams',
          'likeEvents'
        ]
      });
    }

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        'error': 'User not found. Please verify the provided id.'
      });
    }
  },

  updateOneUser: async (req, res) => {
   
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
  },

  getUserEvents: async (req, res) => {
    
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        'error': 'User not found. Please verify the provided id.'
      });
    }

    const userEvents = await user.getEvents();

    res.status(200).json(userEvents);
  },

  getUserTeams: async (req, res) => {
   
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        'error': 'User not found. Please verify the provided id.'
      });
    }

    const userTeams = await user.getTeams();

    res.status(200).json(userTeams);
  },

  followUser: async (req, res) => {
    
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
  },

  unfollowUser: async (req, res) => {
  
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
  },
};

module.exports = controller;