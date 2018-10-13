'use strict';

const express = require('express');

const controllers = require('../controllers');
const serve = require('../lib/serve');

const router = express.Router();

/** Profile Page */
router.route('/')
    .get(
        controllers.profile.getLoans,
        serve('profile'),
    );

/** Edit */
router.route('/edit')
    .get(
        serve('editprofile'),
    )
    .post(
        controllers.profile.edit
    );

/** Password */
router.route('/password')
    .post(
        controllers.profile.password
    )

module.exports = router;