const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors/index');
const Test = require('../models/Test');

const postTest = async (req, res) => {

    try {
        const { testType, testDescription, testScore, testDuraion } = req.body;

        if (!testType) {
            throw new CustomError.BadRequestError('Please provide test type');
        }
    
        const testData = await Test.create({
            adminID: req.user.userId,
            testType,
            testDescription,
            testScore,
            testDuraion
        });
    
        res.status(StatusCodes.CREATED).json({
            msg: 'Success!',
            payload: testData
        });
    } catch (err) {
        throw new CustomError.BadRequestError(err.message);
    }
}

const getTestList = async (req, res) => {

    try {
        const testList = await Test.find({});

        res.status(StatusCodes.OK).json({
            msg: 'Success!',
            payload: testList
        });
    } catch (err) {
        throw new CustomError.BadRequestError(err.message);
    }
}

const updateTest = async (req, res) => {

    try {
        const { testType, testDescription, testID } = req.body;

        if (!testType || !testID) {
            throw new CustomError.BadRequestError('Please provide test ID or type');
        }
    
        const testData = await Test.findOneAndUpdate({ _id: testID, adminID: req.user.userId },{        
            testType,
            testDescription
        });
    
        res.status(StatusCodes.CREATED).json({
            msg: 'Success!',
            payload: testData
        });
    } catch (err) {
        throw new CustomError.BadRequestError(err.message);
    }

}

const deleteTest = async (req, res) => {

    try {
        const { testID } = req.body;

        if (!testID) {
            throw new CustomError.BadRequestError('Please provide test ID');
        }
    
        const testData = await Test.findByIdAndDelete(testID);
    
        res.status(StatusCodes.OK).json({
            msg: 'Success!',
            payload: testData
        });
    } catch (err) {
        throw new CustomError.BadRequestError(err.message);
    }

}

module.exports = {
    postTest,
    getTestList,
    updateTest,
    deleteTest
}