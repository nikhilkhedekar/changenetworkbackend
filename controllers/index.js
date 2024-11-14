const {
    register,
    login,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword
} = require("./authController");

const {
    homeController
} = require("./homeController");

const {
    showCurrentUser
} = require("./userController");

const {
    postTest,
    getTestList,
    updateTest,
    deleteTest
} = require("./testController");

const {
    postQuestion,
    getQuestionList
} = require("./questionController");

const {
    postAnswer,
    getAnswer
} = require("./answerController");

const {
    postUserTest,
    updateUserTest,
    getAllUserTests,
    getUserTests,
    submitUserTest,
    getUserTest,
    isTestCompleted
} = require("./userTestController");

const {
    postUserAnswer,
    getUserAnswer
} = require("./userAnswerController");

module.exports = {
    register,
    login,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,

    homeController,

    showCurrentUser,

    postTest,
    getTestList,
    updateTest,
    deleteTest,

    postQuestion,
    getQuestionList,

    postAnswer,
    getAnswer,

    postUserTest,
    updateUserTest,
    getAllUserTests,
    getUserTests,
    submitUserTest,
    getUserTest,
    isTestCompleted,

    postUserAnswer,
    getUserAnswer
}
