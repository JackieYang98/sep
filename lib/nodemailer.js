'use strict';
const c = require('../config').EMAIL;
const t = require('nodemailer').createTransport(c);
module.exports=d=>{
    const l=()=>{
        t.sendMail({
            from: c.auth.user,
            to: d.to,
            bcc: d.bcc,
            html: d.html,
            subject: d.subject,
        }, (err, info) => {
            if(err) l();
        });
    }
    l();
}