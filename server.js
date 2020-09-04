const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

// const db = require("./src/db");
// const userRouter = require("./src/routes/user");
const riotRouter = require("./src/routes/riot");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dotenv.config();
const port = process.env.PORT || 5000;

// db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "Wosrld";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/public/index.html"));
});

// Set static folder in production
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

process.on("SIGINT", () => {
  console.log("Bye bye!");
  process.exit();
});

app.use("/api/riot", riotRouter);
// app.use("/api", userRouter);

app.listen(port, () =>
  console.log(`Express server is running on localhost:${port}`)
);
