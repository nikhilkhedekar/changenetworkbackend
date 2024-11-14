const mongoose = require("mongoose");

const Test = new mongoose.Schema({
    adminID: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        default: null
    },
    testType: {
        type: String,
        enum: ["React", "Node"],
        required: [true, "Please provide test type."]
    },
    testDescription: {
        type: String,
        default: ""
    },
    testScore: {
        type: Number,   
        default: 0     
    },
    testDuraion: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("tests", Test);