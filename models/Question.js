const mongoose = require("mongoose");

const Question = new mongoose.Schema({
    adminID: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    testID: {
        type: mongoose.Types.ObjectId,
        ref:'tests',
        required: [true, "Please provide test ID."]
    },
    question: {
        type: String,
        required: [true, "Please provide question."]
    },
    answer: {
        type: String,
        required: [true, "Please provide answer."]
    },
    explanation: {
        type: String,
        default: ""
    },
    points: {
        type: Number,
        required: [true, "Please provide points"]
    }
}, { timestamps: true });

module.exports = mongoose.model("question", Question);