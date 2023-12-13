const { Event } = require('../models/index');
const { User } = require('../models/index');
const { Team } = require('../models/index');
const { Op } = require('sequelize');

const controller = {
  searchEvent: async (req, res) => {
    try {
      const eventTitle = req.query.q;

      if (!eventTitle) {
        return res.status(400).json({
          'error': 'Missing event title in the query.'
        });
      }

      const events = await Event.findAll({
        where: { title: {
          [Op.iLike]: `%${eventTitle}%`
        }}
      });

      res.status(200).json(events);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  searchUser: async (req, res) => {
    try {
      const username = req.query.q;

      if (!username) {
        return res.status(400).json({
          'error': 'Missing username in the query.'
        });
      }

      const users = await User.findAll({
        where: { username: {
          [Op.iLike]: `%${username}%`
        }}
      });

      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  searchTeam: async (req, res) => {
    try {
      const teamName = req.query.q;

      if (!teamName) {
        return res.status(400).json({
          'error': 'Missing team name in the query.'
        });
      }

      const teams = await Team.findAll({
        where: { name: {
          [Op.iLike]: `%${teamName}%`
        }}
      });

      res.status(200).json(teams);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  searchAll: async (req, res) => {
    try {
      const query = req.query.q;

      if (!query) {
        return res.status(400).json({
          'error': 'Missing team name in the query.'
        });
      }

      const resultQuery = {
        eventsResult: [],
        usersResult: [],
        teamsResult: []
      };

      const events = await Event.findAll({
        where: { title: {
          [Op.iLike]: `%${query}%`
        }}
      });
      
      events.forEach(event => {
        resultQuery.eventsResult.push(event);
      });

      const users = await User.findAll({
        where: { username: {
          [Op.iLike]: `%${query}%`
        }}
      });

      users.forEach(user => {
        resultQuery.usersResult.push(user);
      });

      const teams = await Team.findAll({
        where: { name: {
          [Op.iLike]: `%${query}%`
        }}
      });

      teams.forEach(team => {
        resultQuery.teamsResult.push(team);
      });

      res.status(200).json(resultQuery);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  }
};

module.exports = controller;