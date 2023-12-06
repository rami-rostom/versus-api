require ('dotenv').config();

const express = require('express');
const router = require('./app/router');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
