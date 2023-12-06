require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./app/router");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
