import axios from 'axios';

const initialState = {
  username: '', // User's email address, a unique identifier
  userid: 0, // User's identification number in the database
  isLoading: false, // Indicates whether the application is currently loading content
  physician: '', // Indicates whether the current user is a physician (as opposed to a patient)
  patients: [], // An array of all non-physician users in the database.
  providers: [], // An array of all provider-permissioned users in the database.
  medicationsMaster: [], // An array made up of all rows from Users and Medications joined.
  medications: [], // Pulls the patient's current medications.
  visitsMaster: [], // An array made up of all rows from Users, Visits, and Physicians joined.
  visits: [], // Pulls the patient's visit history.
  myPatients: [], // Stores all patients that have had, or have upcoming, visits with the current physician user.
  myColleagues: [], // Stores all physicians, minus the current physician user.
  messages: [], // Contains all messages that have been sent to the current user.
  billingItems: [], // Contains the current user's unpaid billing items.
  billingHistory: [], // Contains all of the current user's billing items.
  billingItemsMaster: [], // Contains all billing items for all users.
  myProviders: [], // Stores all of the providers associated with a patient (based on visits)
  profileData: [], // Stores the user's profile details,
  genomicsToken: false, // Indicates whether the user has a 23AndMe token.
  genomicsData: [], // Stores the user's genomics data, retrieved from 23AndMe.
  blogPosts: [], // Contains all of the application's blog posts
  singlePost: [], // Displays a single post (selected by the user)
  comments: [], // Displays all comments left on a single post (selected by the user)
};

// AUTHENTICATION ACTION TYPES
const INITIAL_AUTHENTICATION = 'INITIAL_AUTHENTICATION';
const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
const PHYSICIAN_AUTHENTICATION = 'PHYSICIAN_AUTHENTICATION';

// DATA MANIPULATION AND RETRIEVAL ACTION TYPES
const RETRIEVE_PATIENTS = 'RETRIEVE_PATIENTS';
const RETRIEVE_PROVIDERS = 'RETRIEVE_PROVIDERS';
const RETRIEVE_MEDICATIONS_MASTER = 'RETRIEVE_MEDICATIONS_MASTER';
const RETRIEVE_MEDICATIONS = 'RETRIEVE_MEDICATIONS';
const RETRIEVE_VISITS_MASTER = 'RETRIEVE_VISITS_MASTER';
const RETRIEVE_VISITS = 'RETRIEVE_VISITS';
const RETRIEVE_MY_PATIENTS = 'RETRIEVE_MY_PATIENTS';
const RETRIEVE_MY_COLLEAGUES = 'RETRIEVE_MY_COLLEAGUES';
const RETRIEVE_MESSAGES = 'RETRIEVE_MESSAGES';
const RETRIEVE_BILLING_ITEMS = 'RETRIEVE_BILLING_ITEMS';
const RETRIEVE_BILLING_HISTORY = 'RETRIEVE_BILLING_HISTORY';
const RETRIEVE_BILLING_ITEMS_MASTER = 'RETRIEVE_BILLING_ITEMS_MASTER';
const RETRIEVE_MY_PROVIDERS = 'RETRIEVE_MY_PROVIDERS';
const RETRIEVE_MY_PROFILE = 'RETRIEVE_MY_PROFILE';
const CHECK_TOKEN = 'CHECK_TOKEN';
const RETRIEVE_REPORTS = 'RETRIEVE_REPORTS';
const RETRIEVE_BLOG_POSTS = 'RETRIEVE_BLOG_POSTS';
const RETRIEVE_SINGLE_POST = 'RETRIEVE_SINGLE_POST';
const RETRIEVE_COMMENTS = 'RETRIEVE_COMMENTS';

// REDUCER
export default function reducer(state = initialState, action) {
  console.log('REDUCER HIT: ', action);

  switch (action.type) {
    case INITIAL_AUTHENTICATION:
      return {...state, username: action.payload};

    case PHYSICIAN_AUTHENTICATION:
      return {...state, physician: action.payload};

    case `${AUTHENTICATE_USER}_PENDING`:
      return {...state, isLoading: true};

    case `${AUTHENTICATE_USER}_FULFILLED`:
      return {
        ...state,
        username: action.payload.user,
        userid: action.payload.userid,
        physician: action.payload.physician,
        isLoading: false,
      };

    case `${RETRIEVE_PATIENTS}_PENDING`:
      return {...state, isLoading: true};

    case `${RETRIEVE_PATIENTS}_FULFILLED`:
      return {...state, patients: action.payload, isLoading: false};

    case `${RETRIEVE_PROVIDERS}_PENDING`:
      return {...state, isloading: true};

    case `${RETRIEVE_PROVIDERS}_FULFILLED`:
      return {...state, providers: action.payload, isloading: false};

    case `${RETRIEVE_MEDICATIONS_MASTER}_PENDING`:
      return {...state, isLoading: true};

    case `${RETRIEVE_MEDICATIONS_MASTER}_FULFILLED`:
      return {...state, medicationsMaster: action.payload, isLoading: false};

    case `${RETRIEVE_MEDICATIONS}_PENDING`:
      return {...state, isLoading: true};

    case `${RETRIEVE_MEDICATIONS}_FULFILLED`:
      return {...state, medications: action.payload, isLoading: false};

    case `${RETRIEVE_VISITS_MASTER}_PENDING`:
      return {...state, isLoading: true};

    case `${RETRIEVE_VISITS_MASTER}_FULFILLED`:
      return {...state, visitsMaster: action.payload, isLoading: false};

    case `${RETRIEVE_VISITS}_PENDING`:
      return {...state, isLoading: true};

    case `${RETRIEVE_VISITS}_FULFILLED`:
      return {...state, visits: action.payload, isLoading: false};

    case `${RETRIEVE_MY_PATIENTS}_PENDING`:
      return {...state, isLoading: true};

    case `${RETRIEVE_MY_PATIENTS}_FULFILLED`:
      return {...state, myPatients: action.payload, isLoading: false};

    case `${RETRIEVE_MY_COLLEAGUES}_PENDING`:
      return {...state, isLoading: true};

    case `${RETRIEVE_MY_COLLEAGUES}_FULFILLED`:
      return {...state, myColleagues: action.payload, isLoading: false};

    case `${RETRIEVE_MESSAGES}_PENDING`:
      return {...state, isLoading: true};

    case `${RETRIEVE_MESSAGES}_FULFILLED`:
      return {...state, messages: action.payload, isLoading: false};

    case `${RETRIEVE_BILLING_ITEMS}_PENDING`:
      return {...state, isLoading: true};

    case `${RETRIEVE_BILLING_ITEMS}_FULFILLED`:
      return {...state, billingItems: action.payload, isLoading: false};

    case `${RETRIEVE_BILLING_HISTORY}_PENDING`:
      return {...state, isLoading: true};

    case `${RETRIEVE_BILLING_HISTORY}_FULFILLED`:
      return {...state, billingHistory: action.payload, isLoading: false};

    case `${RETRIEVE_BILLING_ITEMS_MASTER}_PENDING`:
      return {...state, isLoading: true};

    case `${RETRIEVE_BILLING_ITEMS_MASTER}_FULFILLED`:
      return {...state, billingItemsMaster: action.payload, isLoading: false};

    case `${RETRIEVE_MY_PROVIDERS}_PENDING`:
      return {...state, isLoading: true};

    case `${RETRIEVE_MY_PROVIDERS}_FULFILLED`:
      return {...state, myProviders: action.payload, isLoading: false};

    case `${RETRIEVE_MY_PROFILE}_PENDING`:
      return {...state, isLoading: true};

    case `${RETRIEVE_MY_PROFILE}_FULFILLED`:
      return {...state, profileData: action.payload, isLoading: false};

    case CHECK_TOKEN:
      return {...state, genomicsToken: action.payload};

    case `${RETRIEVE_REPORTS}_PENDING`:
      return {...state, isLoading: true};

    case `${RETRIEVE_REPORTS}_FULFILLED`:
      return {...state, genomicsData: action.payload, isLoading: false};

    case `${RETRIEVE_BLOG_POSTS}_PENDING`:
      return {...state, isLoading: true};

    case `${RETRIEVE_BLOG_POSTS}_FULFILLED`:
      return {...state, blogPosts: action.payload, isLoading: false};

    case `${RETRIEVE_SINGLE_POST}_PENDING`:
      return {...state, isLoading: true};

    case `${RETRIEVE_SINGLE_POST}_FULFILLED`:
      return {...state, singlePost: action.payload, isLoading: false};

    case `${RETRIEVE_COMMENTS}_PENDING`:
      return {...state, isLoading: true};

    case `${RETRIEVE_COMMENTS}_FULFILLED`:
      return {...state, comments: action.payload, isLoading: false};

    default:
      return state;
  }
}

// ACTION CREATORS
export const authenticationInitial = username => ({
  type: INITIAL_AUTHENTICATION,
  payload: username,
});

export const physicianAuthentication = physician => ({
  type: PHYSICIAN_AUTHENTICATION,
  payload: physician,
});

export const userAuthenticate = () => ({
  type: AUTHENTICATE_USER,
  payload: axios
    .get('/authentication/session')
    .then(response => response.data)
    .catch(err => console.log(err)),
});

export const retrievePatients = () => ({
  type: RETRIEVE_PATIENTS,
  payload: axios
    .get('/providers/data/patients')
    .then(res => res.data)
    .catch(err => console.log(err)),
});

export const retrieveProviders = () => ({
  type: RETRIEVE_PROVIDERS,
  payload: axios
    .get('/providers/data/providers')
    .then(res => res.data)
    .catch(err => console.log(err)),
});

export const retrieveMedicationsMaster = () => ({
  type: RETRIEVE_MEDICATIONS_MASTER,
  payload: axios
    .get('/providers/data/medications-master')
    .then(res => res.data)
    .catch(err => console.log(err)),
});

export const retrieveMedications = () => ({
  type: RETRIEVE_MEDICATIONS,
  payload: axios
    .get('/patients/data/medications')
    .then(res => res.data)
    .catch(err => console.log(err)),
});

export const retrieveVisitsMaster = () => ({
  type: RETRIEVE_VISITS_MASTER,
  payload: axios
    .get('/providers/data/visits-master')
    .then(res => res.data)
    .catch(err => console.log(err)),
});

export const retrieveVisits = () => ({
  type: RETRIEVE_VISITS,
  payload: axios
    .get('/patients/data/visits')
    .then(res => res.data)
    .catch(err => console.log(err)),
});

export const retrieveMyPatients = () => ({
  type: RETRIEVE_MY_PATIENTS,
  payload: axios
    .get('/providers/data/my-patients')
    .then(res => res.data)
    .catch(err => console.log(err)),
});

export const retrieveMyColleagues = () => ({
  type: RETRIEVE_MY_COLLEAGUES,
  payload: axios
    .get('/providers/data/my-colleagues')
    .then(res => res.data)
    .catch(err => console.log(err)),
});

export const retrieveMessages = () => ({
  type: RETRIEVE_MESSAGES,
  payload: axios
    .get('/data/get-messages')
    .then(res => res.data)
    .catch(err => console.log(err)),
});

export const retrieveBillingItems = () => ({
  type: RETRIEVE_BILLING_ITEMS,
  payload: axios
    .get('/patients/data/get-billing-items')
    .then(res => res.data)
    .catch(err => console.log(err)),
});

export const retrieveBillingHistory = () => ({
  type: RETRIEVE_BILLING_HISTORY,
  payload: axios
    .get('/patients/data/get-billing-history')
    .then(res => res.data)
    .catch(err => console.log(err)),
});

export const retrieveBillingItemsMaster = () => ({
  type: RETRIEVE_BILLING_ITEMS_MASTER,
  payload: axios
    .get('/providers/data/billing-items-master')
    .then(res => res.data)
    .catch(err => console.log(err)),
});

export const retrieveMyProviders = () => ({
  type: RETRIEVE_MY_PROVIDERS,
  payload: axios
    .get('/patients/data/my-providers')
    .then(res => res.data)
    .catch(err => console.log(err)),
});

export const retrieveMyProfile = () => ({
  type: RETRIEVE_MY_PROFILE,
  payload: axios
    .get('/data/get-profile')
    .then(res => res.data)
    .catch(err => console.log(err)),
});

export const checkToken = token => ({
  type: CHECK_TOKEN,
  payload: token,
});

export const retrieveReports = () => ({
  type: RETRIEVE_REPORTS,
  payload: axios
    .get('/data/get-reports')
    .then((res) => {
      const data = res.data;
      data.splice(0, 1);
      return data;
    })
    .catch(err => console.log(err)),
});

export const retrieveBlogPosts = () => ({
  type: RETRIEVE_BLOG_POSTS,
  payload: axios
    .get('/data/get-posts')
    .then(res => res.data)
    .catch(err => console.log(err)),
});

export const retrieveSinglePost = id => ({
  type: RETRIEVE_SINGLE_POST,
  payload: axios
    .get(`/data/get-single-post/${id}`)
    .then(res => res.data)
    .catch(err => console.log(err)),
});

export const retrieveComments = id => ({
  type: RETRIEVE_COMMENTS,
  payload: axios
    .get(`/data/get-comments/${id}`)
    .then(res => res.data)
    .catch(err => console.log(err)),
});
