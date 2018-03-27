// Simple middleware designed to check whether the user has an active session.
// If no session exists, the user is redirected to the homepage in order to protect against unauthorized access.

const sessionChecker = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = {sessionChecker};
