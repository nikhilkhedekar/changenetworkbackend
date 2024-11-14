const CustomError = require('../errors/index');
const { StatusCodes } = require('http-status-codes');
const Question = require('../models/Question');
const Answer = require("../models/Answer");
const mongoose = require("mongoose");

const postUserAnswer = async (req, res) => {

    try {
        let rightAnswer = "";
        let answerPoints = 0;
        const { questionID, userTestID, answer } = req.body;

        if (!questionID && !userTestID && !answer && !points) {
            throw new CustomError.BadRequestError('All fields are mandatory');
        }

        await Question.findOne({
            _id: questionID
        })
            .then(async (data) => {

                rightAnswer = data?.answer;

                if (answer == rightAnswer) {
                    answerPoints = data?.points;
                    const answerData = await Answer.create({
                        questionID,
                        userTestID,
                        answer,
                        points: answerPoints
                    });
                    res.status(StatusCodes.CREATED).json({
                        msg: 'Success!',
                        payload: answerData
                    });
                } else {
                    const answerData = await Answer.create({
                        questionID,
                        userTestID,
                        answer,
                        points: answerPoints
                    });
                    res.status(StatusCodes.CREATED).json({
                        msg: 'Success!',
                        payload: answerData
                    });
                }

            })
            .catch(err => {
                throw new CustomError.BadRequestError(err.message);
            });

    } catch (err) {
        throw new CustomError.BadRequestError(err.message);
    }

}

const getUserAnswer = async (req, res) => {

    try {

        const { questionID, userTestID } = req.body;

        if (!questionID && !userTestID) {
            throw new CustomError.BadRequestError('Please provide question ID and user test ID');
        }

        const answerData = await Answer.aggregate([
            {
                $match: { 
                    questionID: new mongoose.Types.ObjectId(questionID),  
                    userTestID: new mongoose.Types.ObjectId(userTestID)
                }
            },
            {
                $lookup: {
                    from: "usertests",
                    localField: "userTestID",
                    foreignField: "_id",
                    as: "userTestDetails"
                }
            },
            {
                $lookup: {
                    from: "questions",
                    localField: "questionID",
                    foreignField: "_id",
                    as: "questionDetails"
                }
            }
        ]);        


        res.status(StatusCodes.OK).json({
            msg: 'Success!',
            payload: answerData
        });

    } catch (err) {
        throw new CustomError.BadRequestError(err.message);
    }

}

module.exports = {
    postUserAnswer,
    getUserAnswer
}