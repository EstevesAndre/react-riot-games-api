const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const dotenv = require("dotenv");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
dotenv.config();

app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log("Express server is running on localhost:5000")
);
