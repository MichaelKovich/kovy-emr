const meAuthentication = (req, res, next) => {
  req.session.user = req.user;
  const db = req.app.get('db');

  db
    .check_user([req.user.emails[0].value])
    .then((response) => {
      res.status(200).json({user: req.user.emails[0].value, physician: response[0].physician});
    })
    .catch(err => console.log(err));
};

module.exports = {
  meAuthentication,
};
