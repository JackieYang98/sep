'use strict';

const models = require('../models');
const n = require('../lib/nodemailer');

const getQuestions = (req, res, next) => {
    models.Question.findAll({})
    .then(results => {
        res.locals.data.questions = results;
        return next();
    })
    .catch(err => {
        res.locals.err = err;
        return next();
    });
}

const create = async (req, res, next) => {
    const application = await models.Application.create({
        user_id: req.user.id,
        date_created: new Date(),
    })
    .catch(err => {
        res.locals.err = err;
        return next();
    })

    res.locals.data.application_id = application.id;
    return next();
};

const submit = async (req, res, next) => {
    const application_id = req.body.application;
    const insertData = Object.keys(req.body).filter(row => row !== 'application').map(row => {
        const body = req.body[row];
        return {
            application_id: application_id,
            question_id: row,
            answer: body,
            latest: 1
        }
    });

    models.Application_Answer.update({
        latest: 0
    }, {
        where: {
            application_id: application_id,
        }
    })
    .then(values => {
        return models.Application_Answer.bulkCreate(insertData);
    })
    .then(values => {
        return models.Application.update({
            status: 2
        }, {
            where: {
                id: application_id,
            }
        })
    })
    .then(values => {
        return models.User_Role.findAll({
            where: {
                role_id: 2
            },
            include: [
                models.User
            ]
        })
    })
    .then(values => {
        n({
            to: req.user.email,
            bcc: values.map(role => role.User.email),
            subject: 'Application Submitted!',
            html: 'Your application #' + application_id + ' has been submitted successfully!'
        });
        res.status(200).send();
    })
    .catch(err => {
        res.status(400).send();
    })
}

const get = (req, res, next) => {
    const query = {
        include: [
            {
                model: models.Application_Answer,
                where: {
                    latest: 1
                }
            },
            models.User,
            models.Application_Status,
        ]
    };

    if(req.user.role.id > 2) {
        query.where = {
            user_id: req.user.id
        }
    }

    models.Application.findAll(query)
    .then(results => {
        res.locals.data.applications = results;
        return next();
    })
    .catch(err => {
        res.locals.err = err;
        return next();
    })
}

const process = (req, res, next) => {
    const { approve, application_id } = req.body;

    let data = {};
    let actions = [models.Application.update({
        status: approve ? 5 : 6
    }, {
        where: {
            id: application_id,
        },
    })
    .then(values => {
        return models.User_Role.findAll({
            where: {
                role_id: 2
            },
            include: [
                models.User
            ]
        })
    })
    .then(values => {
        const outcome = approve ? 'approved' : 'rejected';
        n({
            to: req.user.email,
            bcc: values.map(role => role.User.email),
            subject: 'Application ' + outcome + '!',
            html: 'Your application #' + application_id + ' has been ' + outcome + '!'
        });
    })];

    if(approve) {
        actions.push(models.Question.findAll({
            include: [{
                model: models.Application_Answer,
                where: {
                    latest: 1,
                    application_id: application_id
                }
            }]
        })
        .then(values => {
            values.forEach(val => {
                data[val.id] = val.Application_Answers[0].answer;
            });

            return models.Application.findOne({
                where: {
                    id: application_id
                },
                include: [
                    models.User
                ]
            })
        })
        .then(values => {
            const user = values.User.id

            return models.Loan.create({
                amount: data[1],
                user_id: user,
                length: data[2],
                application_id: application_id
            });
        }));
    }

    Promise.all(actions)
    .then(values => {
        res.status(200).send();
    })
    .catch(err => {
        console.log(err);
        res.status(400).send(err);
    })
}

const save = (req, res, next) => {
    const application_id = req.body.application;
    const insertData = Object.keys(req.body).filter(row => row !== 'application').map(row => {
        const body = req.body[row];
        return {
            application_id: application_id,
            question_id: row,
            answer: body,
            latest: 1
        }
    });

    models.Application_Answer.update({
        latest: 0
    }, {
        where: {
            application_id: application_id,
        }
    })
    .then(values => {
        return models.Application_Answer.bulkCreate(insertData);
    })
    .then(values => {
        res.status(200).send();
    })
    .catch(err => {
        res.status(400).send();
    })
}

const disableApplication = (req, res, next) => {
    const { id } = req.body;

    models.Application.update({
        status: 4
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
}

const viewApplication = (req, res, next) => {
    const { id } = req.query;

    res.locals.data.application_id = id;

    models.Application_Answer.findAll({
        where: {
            application_id: id,
            latest: 1,
        },
        include: [
            models.Question
        ]
    })
    .then(values => {
        res.locals.data.answers = values.map(value => value.toJSON());
        return models.Application.findOne({
            where: {
                id: id
            },
            include: [
                models.User
            ]
        })
    })
    .then(values => {
        res.locals.data.user = values.User.toJSON();
        return next();
    })
    .catch(err => {
        console.log(err);
        res.locals.err = err;
        return next();
    });
}

const editApplication = (req, res, next) => {
    res.locals.data.questions = res.locals.data.questions.map(question => {
        question = question.toJSON();
        res.locals.data.answers.forEach(answer => {
            if(answer.question_id === question.id) {
                question.answer = answer.answer;
            } 
        });

        return question;
    });

    return next();
};

exports.getQuestions = getQuestions;
exports.create = create;
exports.submit = submit;
exports.get = get;
exports.process = process;
exports.save = save;
exports.delete = disableApplication;
exports.viewApplication = viewApplication;
exports.editApplication = editApplication;