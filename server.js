const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const db = require("./src/db");
const userRouter = require("./src/routes/user");
const riotRouter = require("./src/routes/riot");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dotenv.config();
const port = process.env.PORT || 5001;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "Wosrld";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/riot", riotRouter);
app.use("/api", userRouter);

app.listen(port, () =>
  console.log(`Express server is running on localhost:${port}`)
);
