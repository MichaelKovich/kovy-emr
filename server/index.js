// ABSOLUTE DEPENDENCIES
const express = require('express');
const {json} = require('body-parser');
const cors = require('cors');
const massive = require('massive');
require('dotenv').config();
const path = require('path');

// AUTHENTICATION DEPENDENCIES
const session = require('express-session');
const passport = require('passport');

const strategy = require(`${__dirname}/strategy`);
const {DOMAIN, CLIENT_ID, CLIENT_SECRET} = process.env;

// CONTROLLERS
const {userAuthentication} = require(`${__dirname}/controllers/userAuthenticationController`);

// MIDDLEWARE
const {sessionChecker} = require(`${__dirname}/middleware/sessionChecker`);

// INSTANTIATION OF EXPRESS:
const app = express();

// TOP-LEVEL MIDDLEWARE:
app.use(json());
app.use(cors());

// EXPRESS SESSION
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, // Double check what this means.
  /* Forces a session that is "uninitialized" to be saved to the store.
  A session is uninitialized when it is new but not modified.
  Choosing false is useful for implementing login sessions,
  reducing server storage usage, or complying with laws that require
  permission before setting a cookie. Choosing false will also help
  with race conditions where a client makes multiple parallel requests without a session. */
  cookie: {
    httpOnly: false,
    maxAge: 1210000000, // Two weeks in miliseconds.
  },
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// DIRECT EXPRESS TO SERVE STATIC FILES:
app.use(express.static(`${__dirname}/../build`));

// INSTANTIATION OF MASSIVE
massive(process.env.CONNECTION_STRING)
  .then((dbInstance) => {
    app.set('db', dbInstance);
  })
  .catch(err => console.log(err));

// AUTHENTICATION ROUTES
app.get(
  '/authentication/login',
  passport.authenticate('auth0', {
    successRedirect: '/processing',
    failureRedirect: '/',
  }),
);

app.get('/authentication/me', userAuthentication, (req, res, next) => {
  console.log('Final Authentication Stage!');
  req.session.user = req.user;
  res.status(200).json(req.user.emails[0].value);
});

app.get('/authentication/session', (req, res, next) => {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.redirect('/');
  }
});

app.get('/processing', (req, res, next) => {
  res.sendFile(path.join(`${__dirname}/../build/index.html`));
});

// DASHBOARD ROUTES
app.get('/dashboard', sessionChecker, (req, res, next) => {
  res.sendFile(path.join(`${__dirname}/../build/index.html`));
});

// LISTENING
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Dr. Crane is listening on ${port}!`));
