require('dotenv').config();
const {ACCOUNTSID, AUTHTOKEN} = process.env
const client = require('twilio')(ACCOUNTSID, AUTHTOKEN);

const sendMessage = (req, res, next) => {
  const db = req.app.get('db');
  const {recipientid} = req.body;

  db
    .prov_send_message([
      recipientid,
      req.body.senderid,
      req.body.subject,
      req.body.content,
    ])
    .then((response) => {
      console.log('Send Message Process Complete');
      // run a check on senderid boolean and phone number
      db.prov_prepare_sms([recipientid]).then(res => {
        if (res[0].notifications) {
          sendSMS(res[0].phone);
        }
    }).catch(err => console.log(err))
      res.status(200);
    })
    .catch(err => console.log(err));
};

const sendSMS = (number) => {
  client.messages
    .create({
      to: `+1${number}`,
      from: '+15706693206',
      body: 'Hello! You have received a new message from your healthcare provider on IyashiEMR.',
    })
    .then(message => console.log(message.sid));
};

module.exports = {
  sendMessage,
  sendSMS,
};