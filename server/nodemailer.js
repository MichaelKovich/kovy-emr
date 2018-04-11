const nodemailer = require('nodemailer');
const aws = require('aws-sdk');

aws.config.update({region: 'us-west-2'});

const transporter = nodemailer.createTransport({
  SES: new aws.SES({
    apiVersion: '2010-12-01',
  }),
});

const registrationEmail = (email, firstName) =>
  transporter.sendMail(
    {
      from: 'kovich@michaelkovich.com',
      // "To" is not dynamic due to Amazon SES sandbox limiting, which
      // only allows emails to be sent to verified addresses. To make
      // "to" dynamic, simply replace the current address with the
      // function's email parameter.
      to: 'kovich@michaelkovich.com',
      subject: 'Welcome to IyashiEMR!',
      text: 'I hope this message gets sent!',
      html:
        '<div style="color: #343a40"><p style="font-size: 160%">Welcome to IyashiEMR!</p><p>IyashiEMR makes it easy for patients like you to access, share, and update information with your physician in one secure location.</p><p><a href="https://www.IyashiEMR.com" style="color: #343a40">Click here</a> to get started.</p></div>',
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

module.exports = {
  registrationEmail,
};
