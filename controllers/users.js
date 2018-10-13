'use strict';

const models = require('../models');
const bcrypt = require('bcrypt');

const getUsers = (req, res, next) => {
    models.User.findAll({
        include: [
            {
                model: models.User_Role,
                include: [ models.Role ]
            }
        ],
        where: {
            enabled: 1
        }
    })
    .then(values => {
        values = values.map(value => value.toJSON());
        res.locals.data.users = values;
        return next();
    })
    .catch(err => {
        res.locals.err = err;
        return next();
    });
}

const create = (req, res, next) => {
    const { first_name, last_name, email, number, password, uts_id, role } = req.body;

    models.User.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        number: number,
        password: bcrypt.hashSync(password, 10),
        uts_id: uts_id,
        enabled: 1,
        credit: Math.ceil(Math.random() * 1300),
    })
    .then(user => {
        return models.User_Role.create({
            user_id: user.id,
            role_id: role
        });
    })
    .then(() => {
        res.status(200).send();
    })
    .catch(err => {
        console.log(err);
        res.status(400).send();
    })
};

const deluser = (req, res, next) => {
    const { id } = req.body;
    
    models.User.update({
        enabled: 0
    }, {
        where: {
            id: id
        }
    })
    .then(() => {
        res.status(200).send();
    })
    .catch(err => {
        console.log(err);
        res.status(400).send();
    })
};

exports.getUsers = getUsers;
exports.create = create;
exports.delete = deluser;