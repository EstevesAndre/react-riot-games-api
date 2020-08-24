const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const dotenv = require("dotenv");

const db = require('./db');
const userRouter = require('./routes/user');

const app = express();

const port = process.env.PORT || 5001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(pino);

dotenv.config();

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', userRouter);


app.listen(port, () =>
  console.log(`Express server is running on localhost:${port}`)
);
