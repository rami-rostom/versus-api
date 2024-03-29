const { Event } = require('../models/index');
const { User } = require('../models/index');
const { Team } = require('../models/index');
const { Op } = require('sequelize');

const controller = {
  searchEvent: async (req, res) => {
    const eventTitle = req.query.q;

    if (!eventTitle) {
      return res
        .status(400)
        .json({ 'error': 'Missing event title in the query.' });
    }

    const events = await Event.findAll({
      where: { title: {
        [Op.iLike]: `%${eventTitle}%`
      }}
    });

    res
      .status(200)
      .json(events);
  },

  searchUser: async (req, res) => {
    const username = req.query.q;

    if (!username) {
      return res
        .status(400)
        .json({ 'error': 'Missing username in the query.' });
    }

    const users = await User.findAll({
      where: { username: {
        [Op.iLike]: `%${username}%`
      }}
    });

    res
      .status(200)
      .json(users);
  },

  searchTeam: async (req, res) => {
    const teamName = req.query.q;

    if (!teamName) {
      return res
        .status(400)
        .json({ 'error': 'Missing team name in the query.' });
    }

    const teams = await Team.findAll({
      where: { name: {
        [Op.iLike]: `%${teamName}%`
      }}
    });

    res
      .status(200)
      .json(teams);
  },

  searchAll: async (req, res) => {
    const query = req.query.q;

    if (!query) {
      return res
        .status(400)
        .json({ 'error': 'The query is empty.' });
    }

    // Empty array result which include events, users and teams categories
    const resultQuery = {
      events: [],
      users: [],
      teams: []
    };

    // Request to search events and push the result in the array
    const eventsQuery = await Event.findAll({
      where: {
        title: { [Op.iLike]: `%${query}%`},
        status: 'published'
      }
    });

    eventsQuery.forEach(event => {
      resultQuery.events.push(event);
    });

    // Request to search users and push the result in the array
    const usersQuery = await User.findAll({
      where: {
        username: { [Op.iLike]: `%${query}%` }
      }
    });

    usersQuery.forEach(user => {
      resultQuery.users.push(user);
    });

    // Request to search teams and push the result in the array
    const teamsQuery = await Team.findAll({
      where: {
        name: { [Op.iLike]: `%${query}%` }
      }
    });

    teamsQuery.forEach(team => {
      resultQuery.teams.push(team);
    });

    // Case where there is no result for the research request
    if (
      resultQuery.events.length === 0 && 
        resultQuery.users.length === 0 && 
        resultQuery.teams.length === 0
    ) {
      return res
        .status(204)
        .json(resultQuery);
    }

    // Case where there is/are result(s) for the research request 
    res
      .status(200)
      .json(resultQuery);
  }
};

module.exports = controller;