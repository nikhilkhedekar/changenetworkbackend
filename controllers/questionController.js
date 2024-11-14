const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors/index');
const Question = require('../models/Question');


const postQuestion = async (req, res) => {

    try {
        const { testID, question, answer, explanation,  points } = req.body;

        if (!testID && !question && !answer && !points ) {
            throw new CustomError.BadRequestError('All field are required');
        }
    
        const questionData = await Question.create({
            adminID: req.user.userId,
            testID,
            question,
            answer,
            explanation,
            points 
        });
    
        res.status(StatusCodes.CREATED).json({
            msg: 'Success!',
            payload: questionData
        });
    } catch (err) {
        throw new CustomError.BadRequestError(err.message);
    }

}

const getQuestionList = async (req, res) => {

    try {

        const { testID } = req.body;

        if (!testID) {
            throw new CustomError.BadRequestError('test ID is required');
        }

        const questionList = await Question.find({ testID });

        res.status(StatusCodes.OK).json({
            msg: 'Success!',
            payload: questionList
        });
    } catch (err) {
        throw new CustomError.BadRequestError(err.message);
    }

}

module.exports = {
    postQuestion,
    getQuestionList
}