const { Event } = require('../models/index');

const controller = {
  getAllEvent: async (_, res) => {
    try {
      const events = await Event.findAll({
        include: ['game', 'organizer', 'type_event']
      });

      res.status(200).json(events);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  getOneEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await Event.findByPk(id, {
        include: ['game', 'organizer', 'type_event', 'participants']
      });

      if (event) {
        res.status(200).json(event);
      } else {
        res.status(404).json({
          'error': 'Event not found. Please verify the provided id.'
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  createOneEvent: async (req, res) => {
    try {
      const { title, start_date, end_date, status } = req.body;

      if (!title || !start_date || !end_date || !status) {
        return res.status(400).json({
          'error': 'Missing body parameter'
        });
      }

      const newEvent = await Event.create({ title, start_date, end_date, status });
      res.status(201).json(newEvent);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  }
};

module.exports = controller;