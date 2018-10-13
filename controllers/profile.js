'use strict';

const models = require('../models');
const bcrypt = require('bcrypt');

const getLoans = (req, res, next) => {
    models.Loan.findAll({
        where: {
            user_id: req.user.id
        }
    })
    .then(values => {
        res.locals.data.loans = values;
        return next();
    })
    .catch(err => {
        res.locals.err = err;
        return next();
    });
}

const edit = (req, res, next) => {
    const { first_name, last_name, email } = req.body;

    if(!first_name || !last_name || !email) return res.status(400).send();

    models.User.update(
        {
            first_name: first_name,
            last_name: last_name,
            email: email
        },
        {
            where: {
            id: req.user.id,
            }
        }
    )
    .then(values => {
        res.status(200).send();
    })
    .catch(err => {
        res.status(400).send(err);
    })
};

const password = (req, res, body) => {
    const { password } = req.body;

    if(!password) return res.status(400).send();

    models.User.update({
        password: bcrypt.hashSync(password, 10),
    }, {
        where: {
            id: req.user.id
        }
    })
    .then(values => {
        res.status(200).send();
    })
    .catch(err => {
        res.status(400).send(err);
    })
}

exports.edit = edit;
exports.password = password;
exports.getLoans = getLoans;