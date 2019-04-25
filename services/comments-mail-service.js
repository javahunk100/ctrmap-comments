//Sending email here
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var MailConfig=require('../config/email-config')
const nodemailer = require('nodemailer'),
//creds = require('./creds'),
transporter = nodemailer.createTransport({
    service: MailConfig.serviceProvider,
    auth: {
        user: MailConfig.username,
        pass: MailConfig.password,
    },
}),
EmailTemplate = require('email-templates').EmailTemplate,
path = require('path'),
Promise = require('bluebird'); // Promise API 


//This will just send email for obj data
function sendEmail (obj) {
    return transporter.sendMail(obj);
}

/**
 * This method is used to load your 
 * @param {*} templateName - this is template name 
 * @param {*} contexts  -  data which has to merge
 * Loading html template and merging data 
 */

function loadTemplate (templateName, contexts) {
    let template = new EmailTemplate(path.join(appRoot, 'mails/templates', templateName));
    return Promise.all(contexts.map((context) => {
        return new Promise((resolve, reject) => {
            template.render(context, (err, result) => {
                if (err) reject(err);
                else resolve({
                    email: result,
                    context,
                });
            });
        });
    }));
}

var sendCommentEmail=function(cdata){
     loadTemplate('comment', cdata).then((results) => {
    return Promise.all(results.map((result) => {
        sendEmail({
            to: result.context.email,
            from: 'CTRMAP!!!!!!!!',
            subject: result.email.subject,
            html: result.email.html,
            text: result.email.text,
        });
    }));
}).then(() => {
    console.log('Hey Your email has been sent successfully!');
});
};
module.exports.sendEmail=sendCommentEmail;
