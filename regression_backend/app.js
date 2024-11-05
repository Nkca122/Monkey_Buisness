/*
    Goals For the Backend:
        1. Generation of Reports or atleast graph images like quarto
        2. Regresssion using tensor js and returning the model
 */

const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const tf = require("@tensorflow/tfjs");

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser());
app.use(express.json());
app.use(cors());

/* Start of the Backend */

let model;
app.post("/train", (req, res) => {
  model = tf.sequential();
  let x_df = req.body.x_df;
  let y_df = req.body.y_df;

  // console.log(x_df, y_df)
  let x_df_tensor = tf.tensor2d(x_df);
  let y_df_tensor = tf.tensor2d(y_df);

  model.add(
    tf.layers.dense({
      units: 32,
      activation: "relu",
      inputShape: x_df_tensor.shape[1],
    })
  );
  model.add(tf.layers.dense({ units: 16, activation: "relu" }));
  model.add(tf.layers.dense({ units: 1, activation: 'linear' }));

  model.compile({ optimizer: "adam", loss: "meanSquaredError" });

  model
    .fit(x_df_tensor, y_df_tensor, {
      epochs: 100,
      batchSize: x_df_tensor.shape[1],
    })
    .then((result) => {
      res.send({
        lgModel: model,
        status: 1,
        error: null,
      });
    })
    .catch((err) => {
      res.send({ lgModel: null, status: -1, error: err });
    });
});

app.post("/predict", (req, res) => {
  let p = model.predict(
    tf.tensor([req.body.val[0].map((el) => parseFloat(el))]))
  res.send({
    prediction: p.arraySync(),
  });
});

app.all("*", (req, res) => {
  res.send({
    lgModel: null,
    status: 400,
    error: "Page Not Found",
  });
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`❤️ Server Started at ${process.env.PORT || 4000}!!! ❤️\n`);
});
