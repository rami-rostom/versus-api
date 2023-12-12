const { Team } = require('../models/index');

const controller = {
  getAllTeams: async (_, res) => {
    try {
      const teams = await Team.findAll({
        include: ['players']
      });

      res.status(200).json(teams);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  getOneTeam: async (req, res) => {
    try {
      const { id } = req.params;

      const team = await Team.findByPk(id, {
        include: ['players']
      });

      res.status(200).json(team);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  createOneTeam: async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({
          'error': 'Missing body parameter(s)'
        });
      }

      const newTeam = await Team.create({ name });

      res.status(201).json(newTeam);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  updateOneTeam: async (req, res) => {
    try {
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
      res.json(team);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  updateTeamPlayers: async (req, res) => {
    try {
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
        res.json({ message: 'User added to the team' });
      } else {
        await team.removePlayers(user_id);
        res.json({ message: 'User removed from the team' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  deleteOneTeam: async (req, res) => {
    try {
      const { id } = req.params;
      const team = await Team.findByPk(id);

      if (!team) {
        return res.status(404).json({
          'error': 'Team not found. Please verify the provided id.'
        });
      }

      await team.destroy();
      res.json('Team deleted');
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  }
};

module.exports =  controller;