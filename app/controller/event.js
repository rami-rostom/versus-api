const slugify = require('slugify');
const { Event } = require('../models/index');

const controller = {
  getAllEvent: async (_, res) => {
    try {
      const events = await Event.findAll({
        include: ['game', 'organizer', 'type_event', 'platform']
      });

      res.status(200).json(events);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  getOneEvent: async (req, res) => {
    try {
      const { idOrSlug } = req.params;
      const isId = !isNaN(idOrSlug);

      let event;

      if (isId) {
        event = await Event.findByPk(idOrSlug, {
          include: ['game', 'platform', 'organizer', 'type_event', 'participants']
        });
      } else {
        event = await Event.findOne({
          where: { title_slug: idOrSlug },
          include: ['game', 'platform', 'organizer', 'type_event', 'participants']
        });
      }

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
      const { title, start_date, end_date, user_id } = req.body;

      if (!title || !start_date || !end_date || !user_id) {
        return res.status(400).json({
          'error': 'Missing body parameter(s)'
        });
      }

      const titleCheck = await Event.findOne({
        where: { title }
      });

      if (titleCheck) {
        return res.status(400).json({
          'error': 'Title already used. Please try with a different title.'
        });
      }

      const titleSlugified = slugify(title, { lower: true });

      const newEvent = await Event.create({
        title,
        title_slug: titleSlugified,
        start_date,
        end_date,
        status: 'draft',
        user_id
      });
      res.status(201).json(newEvent);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  updateOneEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await Event.findByPk(id);

      if (!event) {
        return res.status(404).json({
          'error': 'Event not found. Please verify the provided id.'
        });
      }

      const {
        title,
        start_date,
        end_date,
        banner,
        thumbnail,
        location,
        status,
        description,
        rules,
        contact,
        result,
        type_event_id,
        game_id,
        platform_id,
        user_id
      } = req.body;

      if (start_date) { event.start_date = start_date; }
      if (end_date) { event.end_date = end_date; }
      if (banner) { event.banner = banner; }
      if (thumbnail) { event.thumbnail = thumbnail; }
      if (location) { event.location = location; }
      if (status) { event.status = status; }
      if (description) { event.description = description; }
      if (rules) { event.rules = rules; }
      if (contact) { event.contact = contact; }
      if (result) { event.result = result; }
      if (type_event_id) { event.type_event_id = type_event_id; }
      if (game_id) { event.game_id = game_id; }
      if (platform_id) { event.platform_id = platform_id; }
      if (user_id) { event.user_id = user_id; }
      if (title) { event.title = title; }
      if (title) {
        const titleSlugified = slugify(title, { lower: true });
        event.title_slug = titleSlugified;
      }

      await event.save();
      res.json(event);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  addParticipantToEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const { user_id } = req.body;

      const event = await Event.findByPk(id);
  
      if (!event) {
        return res.status(404).json({
          'error': 'Event not found. Please verify the provided id.'
        });
      }
  
      await event.addParticipants(user_id);
  
      res.json({ message: 'User registered to the event' });
    } catch (error) {
      console.error(error);
      res.status(500).json(error.toString());
    }
  },

  removeParticipantFromEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const { user_id } = req.body;

      const event = await Event.findByPk(id);
  
      if (!event) {
        return res.status(404).json({
          'error': 'Event not found. Please verify the provided id.'
        });
      }

      await event.removeParticipants(user_id);
  
      res.json({ message: 'User unregistered from the event' });
    } catch (error) {
      console.error(error);
      res.status(500).json(error.toString());
    }
  },

  deleteOneEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await Event.findByPk(id);

      if (!event) {
        return res.status(404).json({
          'error': 'Event not found. Please verify the provided id.'
        });
      }

      await event.destroy();
      res.json('Event deleted');
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  }
};

module.exports = controller;