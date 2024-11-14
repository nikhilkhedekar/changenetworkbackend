const mongoose = require("mongoose");

const AnswerList = new mongoose.Schema({
    adminID: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    testID: {
        type: mongoose.Types.ObjectId,
        ref:'tests',
        required: [true, "Please provide test ID."]
    },
    questionID: {
        type: mongoose.Types.ObjectId,
        ref: "questions",
        required: [true, "Please provide question ID."]
    },
    answerList: [
        {
            answer: {
                type: String
            },            
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model("answerlist", AnswerList);