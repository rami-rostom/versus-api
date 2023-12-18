const { Team } = require('../models/index');

const controller = {
  getAllTeams: async (_, res) => {
    const teams = await Team.findAll({
      include: ['players']
    });

    res.status(200).json(teams);
  },

  getOneTeam: async (req, res) => {
    const { id } = req.params;

    const team = await Team.findByPk(id, {
      include: ['players']
    });

    res.status(200).json(team);
  },

  createOneTeam: async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        'error': 'Missing body parameter(s)'
      });
    }

    const newTeam = await Team.create({ name });

    res.status(201).json(newTeam);
  },

  updateOneTeam: async (req, res) => {
    const { id } = req.params;
    const team = await Team.findByPk(id);

    if (!team) {
      return res.status(404).json({
        'error': 'Team not found. Please verify the provided id.'
      });
    }

    const { name } = req.body;
    if (name) { team.name = name; }
    await team.save();

    res.status(200).json(team);
  },

  updateTeamPlayers: async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;

    const team = await Team.findByPk(id);

    if (!team) {
      return res.status(404).json({
        'error': 'Team not found. Please verify the provided id.'
      });
    }

    const teamPlayers = await team.getPlayers();

    const isMember = teamPlayers.find((user) => user.id === user_id);

    if (!isMember) {
      await team.addPlayers(user_id);
      res.status(200).json({ message: 'User added to the team' });
    } else {
      await team.removePlayers(user_id);
      res.status(200).json({ message: 'User removed from the team' });
    }
  },

  deleteOneTeam: async (req, res) => {
    const { id } = req.params;
    const team = await Team.findByPk(id);

    if (!team) {
      return res.status(404).json({
        'error': 'Team not found. Please verify the provided id.'
      });
    }

    await team.destroy();

    res.status(200).json('Team deleted');
  }
};

module.exports =  controller;