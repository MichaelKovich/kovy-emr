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
const {getProviders} = require(`${__dirname}/controllers/data/providersController`);
const {addMedication} = require(`${__dirname}/controllers/data/medicationsController`);
const {getMedicationsMaster} = require(`${__dirname}/controllers/data/medicationsController`);
const {updateMedication} = require(`${__dirname}/controllers/data/medicationsController`);
const {getMedications} = require(`${__dirname}/controllers/data/medicationsController`);
const {addVisit} = require(`${__dirname}/controllers/data/visitsController`);
const {getVisitsMaster} = require(`${__dirname}/controllers/data/visitsController`);
const {updateVisit} = require(`${__dirname}/controllers/data/visitsController`);
const {getVisits} = require(`${__dirname}/controllers/data/visitsController`);
const {getMyPatients} = require(`${__dirname}/controllers/data/patientsController`);
const {getMyColleagues} = require(`${__dirname}/controllers/data/providersController`);

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
app.get('/patients/visits', sessionChecker, dashboardRouter);
app.get('/patients/medications', sessionChecker, dashboardRouter);

// PATIENT DATA ROUTES
app.get('/patients/data/visits', sessionChecker, getVisits);
app.get('/patients/data/medications', sessionChecker, getMedications);

// PROVIDER FRONT-END ROUTES
app.get('/providers', sessionChecker, physicianChecker, dashboardRouter);
app.get('/providers/medications/add', sessionChecker, physicianChecker, dashboardRouter);
app.get('/providers/medications/update', sessionChecker, physicianChecker, dashboardRouter);
app.get('/providers/visits/add', sessionChecker, physicianChecker, dashboardRouter);
app.get('/providers/visits/update', sessionChecker, physicianChecker, dashboardRouter);
app.get('/providers/messages/send', sessionChecker, physicianChecker, dashboardRouter);

// PROVIDER DATA ROUTES
app.get('/providers/data/patients', sessionChecker, physicianChecker, getPatients);
app.get('/providers/data/providers', sessionChecker, physicianChecker, getProviders);
app.get(
  '/providers/data/medications-master',
  sessionChecker,
  physicianChecker,
  getMedicationsMaster,
);
app.post('/providers/data/add-medication', sessionChecker, physicianChecker, addMedication);
app.put('/providers/data/update-medication', sessionChecker, physicianChecker, updateMedication);
app.get('/providers/data/visits-master', sessionChecker, physicianChecker, getVisitsMaster);
app.post('/providers/data/add-visit', sessionChecker, physicianChecker, addVisit);
app.put('/providers/data/update-visit', sessionChecker, physicianChecker, updateVisit);
app.get('/providers/data/my-patients', sessionChecker, physicianChecker, getMyPatients);
app.get('/providers/data/my-colleagues', sessionChecker, physicianChecker, getMyColleagues);

// LISTENING
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Dr. Crane is listening on ${port}!`));
