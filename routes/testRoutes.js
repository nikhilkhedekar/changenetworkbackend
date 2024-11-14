const express = require('express');
const router = express.Router();
const {
    authenticateUser,
    authorizePermissions,
} = require('../middleware/full-auth');
const {
    postTest,
    getTestList,
    updateTest,
    deleteTest
} = require("../controllers");

router
    .route('/postTest')
    .post(
        [authenticateUser, authorizePermissions('admin')],
        postTest);

router
    .route('/getTestList')
    .get(
        authenticateUser,
        getTestList);

router
    .route('/updateTest')
    .patch(
        [authenticateUser, authorizePermissions('admin')],
        updateTest);

router
    .route('/deleteTest')
    .post(
        [authenticateUser, authorizePermissions('admin')],
        deleteTest);

module.exports = router