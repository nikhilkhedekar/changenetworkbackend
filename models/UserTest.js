const mongoose = require("mongoose");

const UserTest = new mongoose.Schema({
    testID: {
        type: mongoose.Types.ObjectId,
        ref:'tests'
    },
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'users',        
    },
    userScore: {
        type: Number             
    },
    userTestDuration: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("usertests", UserTest);