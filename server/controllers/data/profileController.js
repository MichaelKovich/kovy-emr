const getProfile = (req, res, next) => {
  const db = req.app.get('db');

  db
    .get_userid([req.session.user.emails[0].value])
    .then((response) => {
      db
        .get_profile([response[0].userid])
        .then(response => res.status(200).json(response))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

const updateProfile = (req, res, next) => {
  console.log('Profile is updating!');
  const db = req.app.get('db');

  db
    .get_userid([req.session.user.emails[0].value])
    .then((response) => {
      db
        .update_profile([
          req.body.given_name,
          req.body.family_name,
          req.body.picture,
          req.body.address,
          req.body.city,
          req.body.state,
          req.body.zip,
          req.body.phone,
          req.body.notifications,
          response[0].userid,
        ])
        .then(response => res.status(200))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

module.exports = {
  getProfile,
  updateProfile,
};
