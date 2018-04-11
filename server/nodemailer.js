const nodemailer = require('nodemailer');
const aws = require('aws-sdk');

aws.config.update({region: 'us-west-2'});

const transporter = nodemailer.createTransport({
  SES: new aws.SES({
    apiVersion: '2010-12-01',
  }),
});

const registrationEmail = () => {
  transporter.sendMail(
    {
      from: 'kovich@michaelkovich.com',
      // "To" is not dynamic because the Amazon SES Sandbox only allows emails to verified addresses.
      // Sending to a dynamic email address is as easy as passing in the user's email address as an argument.
      to: 'kovich@michaelkovich.com',
      subject: 'Welcome to IyashiEMR!',
      text: 'I hope this message gets sent!',
    },
    (err, info) => {
      console.log(info.envelope);
      console.log(info.messageId);
    },
    {
      Statement: [
        {
          Effect: 'Allow',
          Action: 'ses:SendRawEmail',
          Resource: '*',
        },
      ],
    },
  );
};

module.exports = {
  registrationEmail,
};
