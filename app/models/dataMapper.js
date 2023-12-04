const database = require('../database');

const dataMapper = {
  getAllEvents: async () => {
    const query = 'SELECT * FROM event';
    const result = await database.query(query);
    return result.rows;
  }
};

module.exports = dataMapper;
