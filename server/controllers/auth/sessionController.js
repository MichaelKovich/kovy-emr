const sessionControl = (req, res, next) => {
  // If a user object exists on the session, we'll query the database.
  if (req.session.user) {
    const db = req.app.get('db');

    // We're querying the DB to check if the user on session matches with a user
    // who is stored in the database. Then, we're returning their email and their
    // physician boolean value.

    db
      .check_user([req.session.user.emails[0].value])
      .then((response) => {
        if (response.length > 0) {
          res.status(200).json({
            user: response[0].email,
            userid: response[0].userid,
            physician: response[0].physician,
          });
        } else {
          res.redirect('/');
        }
      })
      .catch(err => console.log(err));
  } else {
    // If no user object exists on the session, the user is redirected to the homepage.
    res.redirect('/');
  }
};

module.exports = {
  sessionControl,
};
