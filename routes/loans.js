'use strict';

const express = require('express');

const controllers = require('../controllers');
const serve = require('../lib/serve');

const router = express.Router();

/** Loans Page */
router.route('/')
    .get(
        controllers.loans.getLoans,
        serve('loans'),
    );

module.exports = router;