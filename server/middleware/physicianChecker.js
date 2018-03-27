const physicianChecker = (req, res, next) => {
  if (req.session.user) {
    const db = req.app.get('db');

    db
      .check_physician([req.user.emails[0].value])
      .then(response => (response[0].physician ? next() : res.redirect('/')))
      .catch(err => console.log(err));
  } else {
    res.redirect('/');
  }
};

module.exports = {physicianChecker};
