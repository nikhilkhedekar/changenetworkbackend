const authRouter = require("./authRoutes");
const homeRoute = require("./homeRoute");
const userRouter = require("./userRoutes");
const testRouter = require("./testRoutes");
const questionRouter = require("./questionRoutes");
const answerRouter = require("./answerRoutes");
const userTestRouter = require("./userTestRoutes");
const userAnswerRouter = require("./userAnswerRoutes")

module.exports = {
    authRouter,
    homeRoute,
    userRouter,
    testRouter,
    questionRouter,
    answerRouter,
    userTestRouter,
    userAnswerRouter
}