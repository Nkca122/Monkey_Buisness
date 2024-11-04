/*
    Goals For the Backend:
        1. Generation of Reports or atleast graph images like quarto
        2. Regresssion using ml5js and returning the answer in live time 
 */

const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

/* Start of the Backend */

app.get("/", (req, res) => {
  res.json({
    body: req.body,
    params: req.params,
    header: req.headers,
    ip: req.ip

  });
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`❤️ Server Started at ${process.env.PORT || 4000}!!! ❤️\n`);
});
