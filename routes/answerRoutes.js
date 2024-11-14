const express = require('express');
const router = express.Router();
const {
    authenticateUser,
    authorizePermissions,
} = require('../middleware/full-auth');
const {
    postAnswer,
    getAnswer
} = require("../controllers");

router
    .route('/postAnswer')
    .post(
        [authenticateUser, authorizePermissions('admin')],
        postAnswer);

router
    .route('/getAnswer')
    .post(
        authenticateUser,
        getAnswer);


module.exports = router