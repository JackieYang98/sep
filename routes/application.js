'use strict';

const express = require('express');

const controllers = require('../controllers');
const serve = require('../lib/serve');

const router = express.Router();

/** New Application */
router.route('/new')
    .get(
        controllers.application.getQuestions,
        controllers.application.create,
        serve('application')
    )
    .post(
        controllers.application.submit,
    )

/** Process */
router.route('/process')
    .post(
        controllers.application.process
    );

router.route('/save')
    .post(controllers.application.save);

router.route('/delete')
    .post(controllers.application.delete)

router.route('/view')
    .get(
        controllers.application.viewApplication,
        serve('viewapp')
    )

router.route('/edit')
    .get(
        controllers.application.viewApplication,
        controllers.application.getQuestions,
        controllers.application.editApplication,
        serve('editapp')
    )

module.exports = router;