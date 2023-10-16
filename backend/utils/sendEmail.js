const nodemailer = require('nodemailer');

const sendEmail = (option) => {
    // create a transporter 
    var transport = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth:{
          user: process.env.EMAIL_USER,
          pass:process.env.EMAIL_PASSWORD 
        }
      });
      // send mail with defined transport object
      var mailOptions = {
        from: process.env.EMAIL_USER, // sender address
        to: option.email, // list of receivers
        subject: option.subject, // Subject line
        text: option.message, // plain text body
        html: option.html // html body
      };
      // send mail with defined transport object
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent:'+ info.response);
        }
      });
  
}

module.exports = sendEmail;
