'use strict';

const express = require('express');

const controllers = require('../controllers');
const serve = require('../lib/serve');

const router = express.Router();

/** Users Page */
router.route('/')
    .get(
        controllers.users.getUsers,
        serve('users'),
    );

router.route('/create')
    .post(
        controllers.users.create
    );

router.route('/delete')
    .post(
        controllers.users.delete
    )

module.exports = router;