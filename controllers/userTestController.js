const CustomError = require('../errors/index');
const { StatusCodes } = require('http-status-codes');
const UserTest = require('../models/UserTest');
const mongoose = require("mongoose");
const Answer = require('../models/Answer');

const postUserTest = async (req, res) => {

    try {

        const { testID } = req.body;

        if (!testID) {
            throw new CustomError.BadRequestError('Please provide test ID');
        }

        const userTestData = await UserTest.create({
            testID,
            userID: req.user.userId
        });

        res.status(StatusCodes.CREATED).json({
            msg: 'Success!',
            payload: userTestData
        });

    } catch (err) {
        throw new CustomError.BadRequestError(err.message);
    }

}

const updateUserTest = async (req, res) => {

    try {

        const { testID, userScore, userTestDuration } = req.body;

        if (!testID && !userScore) {
            throw new CustomError.BadRequestError('Please provide test ID and test score');
        }

        const userTestData = await UserTest.findByIdAndUpdate(testID, {
            userScore,
            userTestDuration
        });

        res.status(StatusCodes.CREATED).json({
            msg: 'Success!',
            payload: userTestData
        });

    } catch (err) {
        throw new CustomError.BadRequestError(err.message);
    }

}

const submitUserTest = async (req, res) => {
    try {

        const { userTestID } = req.body;
        let testScore = 0;

        if (!userTestID) {
            throw new CustomError.BadRequestError('Please provide user test ID');
        }

        await Answer.find({
            userTestID
        })
            .then(async (data) => {

                for (let answerData of data) {
                    if (answerData?.points > 0) {
                        testScore += answerData?.points;
                    }
                }

                const userTestData = await UserTest.findByIdAndUpdate(userTestID, {
                    userScore: testScore,
                    userTestDuration: ""
                });

                res.status(StatusCodes.CREATED).json({
                    msg: 'Success!',
                    payload: userTestData
                });

            })
            .catch((err) => {
                throw new CustomError.BadRequestError(err.message);
            })

    } catch (err) {
        throw new CustomError.BadRequestError(err.message);
    }
}

const getAllUserTests = async (req, res) => {

    try {

        const allUserTestList = await UserTest.aggregate([
            {
                $match: {}
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
                    from: "users",
                    localField: "userID",
                    foreignField: "_id",
                    as: "userDetails"
                }
            }
        ]);


        res.status(StatusCodes.OK).json({
            msg: 'Success!',
            payload: allUserTestList
        });

    } catch (err) {
        throw new CustomError.BadRequestError(err.message);
    }

}

const getUserTests = async (req, res) => {

    try {

        const userTestList = await UserTest.aggregate([
            {
                $match: { userID: new mongoose.Types.ObjectId(req.user.userId) }
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
                    from: "users",
                    localField: "userID",
                    foreignField: "_id",
                    as: "userDetails"
                }
            }
        ]);

        res.status(StatusCodes.OK).json({
            msg: 'Success!',
            payload: userTestList
        });

    } catch (err) {
        throw new CustomError.BadRequestError(err.message);
    }

}

const getUserTest = async (req, res) => {
    try {

        const { userTestID } = req.body;

        if (!userTestID) {
            throw new CustomError.BadRequestError('Please provide user test ID');
        }

        const userTestData = await UserTest.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(userTestID) }
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
                    from: "users",
                    localField: "userID",
                    foreignField: "_id",
                    as: "userDetails"
                }
            }
        ]);

        res.status(StatusCodes.OK).json({
            msg: 'Success!',
            payload: userTestData
        });

    } catch (err) {
        throw new CustomError.BadRequestError(err.message);
    }
}

const isTestCompleted = async (req, res) => {

    try {

        const { testID } = req.body;

        if (!testID) {
            throw new CustomError.BadRequestError('Please provide test ID');
        }

        const userTestData = await UserTest.findOne({
            userID: req.user.userId,
            testID
        });

        res.status(StatusCodes.OK).json({
            msg: 'Success!',
            payload: userTestData
        });

    } catch (err) {
        throw new CustomError.BadRequestError(err.message);
    }

}

module.exports = {
    postUserTest,
    updateUserTest,
    getAllUserTests,
    getUserTests,
    submitUserTest,
    getUserTest,
    isTestCompleted
}