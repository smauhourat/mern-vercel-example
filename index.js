const environment = require('./environment');
global.env = environment;

const express = require("express");
const connectDB = require('./config/db');
const app = express();

const path = require("path");
const logger = require("morgan");
const cors = require("cors");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

require("dotenv").config();

console.log(process.env.MONGO_URI)

// Connect DB
connectDB();

// Init Middleware
app.use(express.json({ extended: false, limit: '50mb' }))
//app.use(morgan('tiny'));

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return next();
})

app.get("/api/test", (req, res) => {
  res.send("test - conectamos git");
});

app.use('/api/trips', require('./routes/api/trips'));

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));

module.exports = app;
