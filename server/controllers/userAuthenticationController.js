const userAuthentication = (req, res, next) => {
  const db = req.app.get('db');

  if (!req.user) {
    console.log('Unauthorized!');
    return res.status(401).json({message: 'Unauthorized.'});
  }

  db
    .check_user([req.user.emails[0].value])
    .then((res) => {
      if (res.length < 1) {
        console.log('Carry on to registerUser!');
        db
          .create_user([
            req.user.emails[0].value,
            req.user.name.givenName,
            req.user.name.familyName,
            req.user.picture,
          ])
          .then((user) => {
            // The user's unique ID is user[0].userid;
            console.log('Registration Successful!');
            next();
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({message: 'Registration Failed!'});
          });
      } else {
        console.log("User exists! Let's continue.");
        next();
      }
    })
    .catch();
};

module.exports = {
  userAuthentication,
};
