const getProviders = (req, res, next) => {
  const db = req.app.get('db');

  db
    .prov_get_providers()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(err => console.log(err));
};

const getMyColleagues = (req, res, next) => {
  const db = req.app.get('db');

  db
    .pat_get_userid([req.session.user.emails[0].value])
    .then((response) => {
      db
        .prov_get_my_colleagues([response[0].userid])
        .then(response => res.status(200).json(response))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

module.exports = {
  getProviders,
  getMyColleagues,
};
