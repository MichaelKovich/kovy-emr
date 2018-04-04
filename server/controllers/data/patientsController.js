const getPatients = (req, res, next) => {
  const db = req.app.get('db');

  db
    .prov_get_patients()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(err => console.log(err));
};

const getMyPatients = (req, res, next) => {
  const db = req.app.get('db');

  db
    .get_userid([req.session.user.emails[0].value])
    .then((response) => {
      db
        .prov_get_my_patients([response[0].userid])
        .then(response => res.status(200).json(response))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

module.exports = {
  getPatients,
  getMyPatients,
};
