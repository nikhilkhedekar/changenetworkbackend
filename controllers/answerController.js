const AnswerList = require("../models/AnswerList");
const CustomError = require('../errors/index');
const { StatusCodes } = require('http-status-codes');
const mongoose = require("mongoose");

const postAnswer = async (req, res) => {

    try {
        const { testID, questionID, answerList } = req.body;

        if (!testID && !questionID && !answerList) {
            throw new CustomError.BadRequestError('All field are required');
        }

        const answerData = await AnswerList.create({
            adminID: req.user.userId,
            testID,
            questionID,
            answerList
        });

        res.status(StatusCodes.CREATED).json({
            msg: 'Success!',
            payload: answerData
        });
    } catch (err) {
        throw new CustomError.BadRequestError(err.message);
    }

}

const getAnswer = async (req, res) => {

    try {

        const { questionID } = req.body;

        if (!questionID) {
            throw new CustomError.BadRequestError('Please provide question ID');
        }

        const answerData = await AnswerList.aggregate([
            {
                $match: { questionID: new mongoose.Types.ObjectId(questionID) }
            },
            {
                $lookup: {
                    from: "tests",
                    localField: "testID",
                    foreignField: "_id",
                    as: "testDetails"
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
    postAnswer,
    getAnswer
}