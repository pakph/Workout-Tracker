const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    day: {
        type: Number,
        default: Date.now
    },

    exercises: 
    [
        {
            type: {
                type: String,
                trim: true,
                required: "Select a workout type"
            },
            name: {
                type: String,
                trim: true,
                required: "Enter the name of the workout"
            },
            duration: {
                type: Number
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            }
        }
    ]
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;