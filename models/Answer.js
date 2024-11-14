const mongoose = require("mongoose");

const Answer = new mongoose.Schema({
    questionID: {
        type: mongoose.Types.ObjectId,
        ref: "questions"
    },
    userTestID: {
        type: mongoose.Types.ObjectId,
        ref: "usertests"
    },    
    answer: {
        type: String,
        required: [true, "Please provide answer."]
    }, 
    points: {
        type: Number,
        required: [true, "Please provide points."]    
    }
}, { timestamps: true });

module.exports = mongoose.model("answers", Answer);