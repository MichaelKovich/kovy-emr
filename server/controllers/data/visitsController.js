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

module.exports = {
  addVisit,
  updateVisit,
  getVisitsMaster,
  getVisits,
};
