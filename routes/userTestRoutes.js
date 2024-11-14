const express = require('express');
const router = express.Router();
const {
    authenticateUser,
    authorizePermissions,
} = require('../middleware/full-auth');
const {
    postUserTest,
    updateUserTest,
    getAllUserTests,
    getUserTests,
    submitUserTest,
    getUserTest,
    isTestCompleted
} = require("../controllers");

router
    .route('/postUserTest')
    .post(
        authenticateUser,
        postUserTest);

router
    .route('/updateUserTest')
    .patch(
        authenticateUser,
        updateUserTest);

router
    .route('/getAllUserTests')
    .get(getAllUserTests);

router
    .route('/getUserTests')
    .get(authenticateUser, getUserTests);

router
    .route('/submitUserTest')
    .post(authenticateUser, submitUserTest);

router
    .route('/getUserTest')
    .post(authenticateUser, getUserTest);

router
    .route('/isTestCompleted')
    .post(authenticateUser, isTestCompleted);

module.exports = router