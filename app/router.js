const { Router } = require('express');
const router = Router();

const mainController = require('./controllers/mainController');

router.get('/events', mainController.renderAllEvents);

module.exports = router;