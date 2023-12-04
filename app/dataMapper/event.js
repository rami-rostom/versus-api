const db = require('../db');

const eventDataMapper = {
  getAll: async () => {
    let sqlQuery = 'SELECT * FROM event';
    const result = await db.query(sqlQuery);

    return result.rows;
  },
  getOne: async (eventId) => {
    let sqlQuery = 'SELECT * FROM event WHERE id = $1';
    const result = await db.query(sqlQuery, [eventId]);

    return result.rows[0];
  }
};

module.exports = eventDataMapper;
