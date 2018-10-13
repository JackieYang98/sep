'use strict';

const models = require('../models');

const getLoans = (req, res, next) => {
    models.Loan.findAll({
        include: [
            models.User
        ]
    })
    .then(values => {
        values = values.map(value => value.toJSON());
        res.locals.data.loans = values;
        return next();
    })
    .catch(err => {
        res.locals.err = err;
        return next();
    });
}

exports.getLoans = getLoans;
