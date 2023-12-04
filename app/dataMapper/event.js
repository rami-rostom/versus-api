const db = require('../db');

const eventDataMapper = {
  getAll: async () => {
    const sqlQuery = 'SELECT * FROM event';
    const result = await db.query(sqlQuery);

    return result.rows;
  },

  getOne: async (eventId) => {
    const sqlQuery = 'SELECT * FROM event WHERE id = $1';
    const result = await db.query(sqlQuery, [eventId]);

    return result.rows[0];
  },

  create: async (title, start_date, end_date, status) => {
    const sqlQuery = 'INSERT INTO event (title, start_date, end_date, status) VALUES ($1, $2, $3, $4)';
    const result = await db.query(sqlQuery, [title, start_date, end_date, status]);

    return result.rows[0];
  }
};

module.exports = eventDataMapper;
