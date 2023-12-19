const slugify = require('slugify');
const { Event } = require('../models/index');

const controller = {
  getAllEvent: async (_, res) => {
    const events = await Event.findAll({
      include: ['game', 'organizer', 'type_event', 'platform']
    });

    res
      .status(200)
      .json(events);
  },

  getAllPublishedEvent: async (_, res) => {
    const events = await Event.findAll({
      where: { status: 'published' },
      include: ['game', 'organizer', 'type_event', 'platform']
    });

    res
      .status(200)
      .json(events);
  },

  getOneEvent: async (req, res) => {
    // An event can be requested with his ID or his slug
    const { idOrSlug } = req.params;
    const isId = !isNaN(idOrSlug);

    let event;

    if (isId) {
      // Case where the param is an ID
      event = await Event.findByPk(idOrSlug, {
        include: ['game', 'platform', 'organizer', 'type_event', 'participants']
      });
    } else {
      // Case where the param is a slug
      event = await Event.findOne({
        where: { title_slug: idOrSlug },
        include: ['game', 'platform', 'organizer', 'type_event', 'participants']
      });
    }

    if (event) {
      res
        .status(200)
        .json(event);
    } else {
      res
        .status(404)
        .json({ 'error': 'Event not found. Please verify the provided id.' });
    }
  },

  createOneEvent: async (req, res) => {
    const { title, start_date, end_date, user_id } = req.body;

    if (!title || !start_date || !end_date || !user_id) {
      return res
        .status(400)
        .json({ 'error': 'Missing body parameter(s).' });
    }

    // Verification for unique title event
    const titleCheck = await Event.findOne({
      where: { title }
    });

    if (titleCheck) {
      return res
        .status(400)
        .json({ 'error': 'Title already used. Please try with a different one.' });
    }

    // Slugify the title with lower case option
    const titleSlugified = slugify(title, { lower: true });

    const newEvent = await Event.create({
      title,
      title_slug: titleSlugified,
      start_date,
      end_date,
      status: 'draft',
      user_id
    });

    res
      .status(201)
      .json(newEvent);
  },

  updateOneEvent: async (req, res) => {
    const { id } = req.params;
    const event = await Event.findByPk(id);

    if (!event) {
      return res
        .status(404)
        .json({ 'error': 'Event not found. Please verify the provided id.' });
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

    // If the title is updated, the title_slug is automatically updated
    if (title) {
      const titleSlugified = slugify(title, { lower: true });
      event.title_slug = titleSlugified;
    }

    await event.save();
  
    res
      .status(200)
      .json(event);
  },

  addParticipantToEvent: async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;

    const event = await Event.findByPk(id);
  
    if (!event) {
      return res
        .status(404)
        .json({ 'error': 'Event not found. Please verify the provided id.' });
    }
  
    // Use Sequelize method to add a new entry in "event_has_user" table
    await event.addParticipants(user_id);
  
    res
      .status(200)
      .json({ 'message': 'User registered to the event.' });
  },

  removeParticipantFromEvent: async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;

    const event = await Event.findByPk(id);
  
    if (!event) {
      return res
        .status(404)
        .json({ 'error': 'Event not found. Please verify the provided id.' });
    }

    // Use Sequelize method to remove an entry from "event_has_user" table
    await event.removeParticipants(user_id);
  
    res
      .status(200)
      .json({ 'message': 'User unregistered from the event.' });
  },

  deleteOneEvent: async (req, res) => {
    const { id } = req.params;
    const event = await Event.findByPk(id);

    if (!event) {
      return res
        .status(404)
        .json({ 'error': 'Event not found. Please verify the provided id.' });
    }

    await event.destroy();

    res
      .status(200)
      .json({ 'message': 'Event is successfully deleted.'} );
  }
};

module.exports = controller;