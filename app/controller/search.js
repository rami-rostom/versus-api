const { Event } = require('../models/index');
const { User } = require('../models/index');
const { Team } = require('../models/index');
const { Op } = require('sequelize');

const controller = {
  searchEvent: async (req, res) => {
  
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
  },

  searchUser: async (req, res) => {
  
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
  },

  searchTeam: async (req, res) => {
   
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
  },

  searchAll: async (req, res) => {
  
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({
        'error': 'The query is empty.'
      });
    }

    const resultQuery = {
      events: [],
      users: [],
      teams: []
    };

    const eventsQuery = await Event.findAll({
      where: { title: {
        [Op.iLike]: `%${query}%`
      }}
    });

    eventsQuery.forEach(event => {
      resultQuery.events.push(event);
    });

    const usersQuery = await User.findAll({
      where: { username: {
        [Op.iLike]: `%${query}%`
      }}
    });

    usersQuery.forEach(user => {
      resultQuery.users.push(user);
    });

    const teamsQuery = await Team.findAll({
      where: { name: {
        [Op.iLike]: `%${query}%`
      }}
    });

    teamsQuery.forEach(team => {
      resultQuery.teams.push(team);
    });

    if (
      resultQuery.events.length === 0 && 
        resultQuery.users.length === 0 && 
        resultQuery.teams.length === 0
    ) {
      return res.status(204);
    }

    res.status(200).json(resultQuery);
  },
};

module.exports = controller;