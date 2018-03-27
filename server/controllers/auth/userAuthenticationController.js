const userAuthentication = (req, res, next) => {
  const db = req.app.get('db');

  // If no user object exists on the request, the user is unauthorized.
  if (!req.user) {
    return res.status(401).json({message: 'Unauthorized.'});
  }

  // Checking to see if the user's email address exists in the database
  // Their email address is a suitable unique identifier as its restricted to unique values in the DB.

  db
    .check_user([req.user.emails[0].value])
    .then((res) => {
      if (res.length < 1) {
        // If it does not, then we'll register the user by adding them to the DB.
        db
          .create_user([
            // Creating a user in the database with the values provided by Auth0
            req.user.emails[0].value,
            req.user.name.givenName,
            req.user.name.familyName,
            req.user.picture,
          ])
          .then((user) => {
            next();
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({message: 'Registration Failed!'});
          });
      } else {
        // If the user exists, we can continue onward because we'll set the email
        // to the user object on session via /authentication/me (index.js)
        next();
      }
    })
    .catch(err => console.log(err));
};

module.exports = {
  userAuthentication,
};
