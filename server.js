const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const Exercise = require("./exerciseModel.js");
const { Router } = require("express");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutsdb", { useNewUrlParser: true });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.post("/api/workouts", ({ body }, res) => {
  Exercise.create({ $push: {exercises: body}})
    .then(exercise => {
      res.json(exercise);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/workouts", (req, res) => {
  Exercise.find({})
    .sort({ date: -1 })
    .then(exercise => {
      res.json(exercise);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
  Exercise.find({})
    .then(exercise => {
      res.json(exercise);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

app.put("/api/workouts/:id", ({ params, body}, res) => {
  Exercise.findByIdAndUpdate(
      { _id: params.id }, 
      { $set: {exercises: body}}, 
      {new: true, runvalidators: true})
      .then(exercise => {
          if(!exercise){
              res.status(400).json({message: "no workout found with this id"});
              return;
          }
          res.json(exercise);
   
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});