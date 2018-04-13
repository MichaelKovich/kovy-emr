// ABSOLUTE DEPENDENCIES
const express = require('express');
const {json} = require('body-parser');
const cors = require('cors');
const massive = require('massive');
require('dotenv').config();

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
const {cancelVisit} = require(`${__dirname}/controllers/data/visitsController`);
const {getVisits} = require(`${__dirname}/controllers/data/visitsController`);
const {getMyPatients} = require(`${__dirname}/controllers/data/patientsController`);
const {getMyColleagues} = require(`${__dirname}/controllers/data/providersController`);
const {sendMessage} = require(`${__dirname}/controllers/data/messagesController`);
const {getMessages} = require(`${__dirname}/controllers/data/messagesController`);
const {getBillingItems} = require(`${__dirname}/controllers/billing/billingController`);
const {getBillingHistory} = require(`${__dirname}/controllers/billing/billingController`);
const {addBill} = require(`${__dirname}/controllers/billing/billingController`);
const {updateBill} = require(`${__dirname}/controllers/billing/billingController`);
const {getBillingItemsMaster} = require(`${__dirname}/controllers/billing/billingController`);
const {getMyProviders} = require(`${__dirname}/controllers/data/providersController`);
const {getProfile} = require(`${__dirname}/controllers/data/profileController`);
const {updateProfile} = require(`${__dirname}/controllers/data/profileController`);
const {receiveCode} = require(`${__dirname}/controllers/genomics/TTAMController`);
const {checkToken} = require(`${__dirname}/controllers/genomics/TTAMController`);
const {getReports} = require(`${__dirname}/controllers/genomics/TTAMController`);

// TEST
const {registrationEmail} = require(`${__dirname}/nodemailer.js`);
// TEST

// BILLING CONTROLLER
const {stripeCharge} = require(`${__dirname}/controllers/billing/stripeController`);

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

// AMAZON S3
app.use(
  '/s3',
  require('react-s3-uploader/s3router')({
    bucket: 'iyashi-emr',
    region: 'us-west-1',
    signatureVersion: 'v4',
    headers: {'Access-Control-Allow-Origin': '*'},
    ACL: 'private',
    uniquePrefix: true, // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
  }),
);

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
app.get('/patients/billing', sessionChecker, dashboardRouter);
app.get('/patients/billing/history', sessionChecker, dashboardRouter);
app.get('/patients/messages', sessionChecker, dashboardRouter);
app.get('/patients/messages/send', sessionChecker, dashboardRouter);
app.get('/patients/profile', sessionChecker, dashboardRouter);
app.get('/patients/profile/picture', sessionChecker, dashboardRouter);
app.get('/patients/genomics', sessionChecker, dashboardRouter);
app.get('/patients/genomics/reports', sessionChecker, dashboardRouter);
app.get('/patients/genomics/authorization', sessionChecker, dashboardRouter);

// PATIENT DATA ROUTES
app.get('/patients/data/visits', sessionChecker, getVisits);
app.put('/patients/data/cancel-visit/:id', sessionChecker, cancelVisit);
app.get('/patients/data/medications', sessionChecker, getMedications);
app.get('/patients/data/get-billing-items', sessionChecker, getBillingItems);
app.get('/patients/data/get-billing-history', sessionChecker, getBillingHistory);
app.get('/patients/data/my-providers', sessionChecker, getMyProviders);

// PROVIDER FRONT-END ROUTES
app.get('/providers', sessionChecker, physicianChecker, dashboardRouter);
app.get('/providers/medications/add', sessionChecker, physicianChecker, dashboardRouter);
app.get('/providers/medications/update', sessionChecker, physicianChecker, dashboardRouter);
app.get('/providers/visits/add', sessionChecker, physicianChecker, dashboardRouter);
app.get('/providers/visits/update', sessionChecker, physicianChecker, dashboardRouter);
app.get('/providers/messages', sessionChecker, physicianChecker, dashboardRouter);
app.get('/providers/messages/send', sessionChecker, physicianChecker, dashboardRouter);
app.get('/providers/billing/add', sessionChecker, physicianChecker, dashboardRouter);
app.get('/providers/billing/update', sessionChecker, physicianChecker, dashboardRouter);
app.get('/providers/profile', sessionChecker, physicianChecker, dashboardRouter);
app.get('/providers/profile/picture', sessionChecker, physicianChecker, dashboardRouter);

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
app.post('/providers/data/add-bill', sessionChecker, physicianChecker, addBill);
app.put('/providers/data/update-bill', sessionChecker, physicianChecker, updateBill);
app.get(
  '/providers/data/billing-items-master',
  sessionChecker,
  physicianChecker,
  getBillingItemsMaster,
);

// UNIVERSAL DATA ROUTES
app.get('/data/get-messages', sessionChecker, getMessages);
app.post('/data/send-message', sessionChecker, sendMessage);
app.get('/data/get-profile', sessionChecker, getProfile);
app.put('/data/update-profile', sessionChecker, updateProfile);

// PAYMENT DATA ROUTE
app.post('/patients/billing/charge', sessionChecker, stripeCharge);

// 23ANDME ROUTE
app.get('/receive_code', sessionChecker, receiveCode);
app.get('/data/token', sessionChecker, checkToken);
app.get('/data/get-reports', sessionChecker, getReports);

// TEST
app.get('/data/send', registrationEmail);
// TEST

// 404 ROUTE
app.get('*', dashboardRouter);

// LISTENING
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Dr. Crane is listening on ${port}!`));
