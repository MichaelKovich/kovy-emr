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

// USER AUTHENTICATION CONTROLLERS
const {userAuthentication} = require(`${__dirname}/controllers/auth/userAuthenticationController`);
const {sessionControl} = require(`${__dirname}/controllers/auth/sessionController`);
const {meAuthentication} = require(`${__dirname}/controllers/auth/meController`);

// DATA MANIPULATION AND RETRIEVAL CONTROLLERS
const {getPatients} = require(`${__dirname}/controllers/data/patientsController`);
const {addMedication} = require(`${__dirname}/controllers/data/medicationsController`);
const {getMedicationsMaster} = require(`${__dirname}/controllers/data/medicationsController`);

// MIDDLEWARE
const {sessionChecker} = require(`${__dirname}/middleware/sessionChecker`);
const {physicianChecker} = require(`${__dirname}/middleware/physicianChecker`);
const {dashboardRouter} = require(`${__dirname}/middleware/dashboardRouter`);

// INSTANTIATION OF EXPRESS:
const app = express();

// TOP-LEVEL MIDDLEWARE:
app.use(json());
app.use(cors());

// EXPRESS SESSION
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
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

app.get('/processing', dashboardRouter);
app.get('/authentication/me', userAuthentication, meAuthentication);
app.get('/authentication/session', sessionControl);

// PATIENT FRONT-END ROUTES
app.get('/patients', sessionChecker, dashboardRouter);

// PATIENT DATA ROUTES
// FIRST ENTRY HERE

// PROVIDER FRONT-END ROUTES
app.get('/providers', sessionChecker, physicianChecker, dashboardRouter);
app.get('/providers/medications/add', sessionChecker, physicianChecker, dashboardRouter);
app.get('/providers/medications/update', sessionChecker, physicianChecker, dashboardRouter);

// PROVIDER DATA ROUTES
app.get('/providers/data/patients', sessionChecker, physicianChecker, getPatients);
app.get(
  '/providers/data/medications-master',
  sessionChecker,
  physicianChecker,
  getMedicationsMaster,
);
app.post('/providers/data/add-medication', sessionChecker, physicianChecker, addMedication);

// LISTENING
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Dr. Crane is listening on ${port}!`));
