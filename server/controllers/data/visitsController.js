require('dotenv').config();

const {ACCOUNTSID, AUTHTOKEN} = process.env;
const client = require('twilio')(ACCOUNTSID, AUTHTOKEN);

const addVisit = (req, res, next) => {
  const db = req.app.get('db');

  db
    .prov_add_visit([req.body.type, req.body.date, req.body.patient, req.body.provider])
    .then(response => res.status(200))
    .catch(err => console.log(err));
};

const updateVisit = (req, res, next) => {
  const db = req.app.get('db');
  console.log(req.body.visitid);

  db
    .prov_update_visit([
      req.body.type,
      req.body.date,
      req.body.patient,
      req.body.provider,
      req.body.visitid,
    ])
    .then(response => res.status(200))
    .catch(err => console.log(err));
};

const getVisitsMaster = (req, res, next) => {
  const db = req.app.get('db');

  db
    .prov_get_visits_master()
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

const getVisits = (req, res, next) => {
  const db = req.app.get('db');

  db
    .get_userid([req.session.user.emails[0].value])
    .then((response) => {
      db
        .pat_get_visits([response[0].userid])
        .then((response) => {
          res.status(200).json(response);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

const sendSMS = (number, date) => {
  client.messages
    .create({
      to: `+1${number}`,
      from: '+15706693206',
      body: `Hello! A patient has just canceled a visit for ${date}. Please remember to review your upcoming appointments.`,
    })
    .then(message => console.log(message.sid));
};

const cancelVisit = (req, res, next) => {
  const db = req.app.get('db');

  db
    .get_visit_provider([req.params.id])
    .then((response) => {
      if (response[0].notifications) {
        sendSMS(response[0].phone, req.body.date);
        db
          .pat_cancel_visit([req.params.id])
          .then(response => res.status(200))
          .catch(err => console.log(err));
      }
      db
        .pat_cancel_visit([req.params.id])
        .then(response => res.status(200))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

module.exports = {
  addVisit,
  updateVisit,
  getVisitsMaster,
  getVisits,
  cancelVisit,
};
