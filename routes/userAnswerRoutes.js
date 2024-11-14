const express = require('express');
const router = express.Router();
const {
    authenticateUser,
    authorizePermissions,
} = require('../middleware/full-auth');
const {
    postUserAnswer,
    getUserAnswer
} = require("../controllers");

router
    .route('/postUserAnswer')
    .post(
        authenticateUser,
        postUserAnswer);

router
    .route('/getUserAnswer')
    .post(
        authenticateUser,
        getUserAnswer);

module.exports = router