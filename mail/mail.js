var config  = require('../config/config.js');
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
    service :"gmail",
    host: "smtp.gmail.com",
    auth :
    {
        user: config.email,
        pass: config.password
    }
});


// setup email data with unicode symbols
var mailOptions = {
    from: config.email,
    to: 'kishankr.maurya@gmail.com',
    subject :'Registration Successfully',
    text :' "Hi",\n You have successfully created an account"',
    html: '<b>Welcome?</b>' // html body
};

// sends mail
module.exports.sendMail  = function()
{
 // send mail with defined transport object
 smtpTransport.sendMail(mailOptions, (error, info) => {
    if (error)
    {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);});
}