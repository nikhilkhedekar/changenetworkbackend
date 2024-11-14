const express = require('express');
const router = express.Router();
const {
    authenticateUser,
    authorizePermissions,
} = require('../middleware/full-auth');
const {
    postQuestion,
    getQuestionList
} = require("../controllers");

router
    .route('/postQuestion')
    .post(
        [authenticateUser, authorizePermissions('admin')],
        postQuestion);

router
    .route('/getQuestionList')
    .post(
        authenticateUser,
        getQuestionList);

module.exports = router