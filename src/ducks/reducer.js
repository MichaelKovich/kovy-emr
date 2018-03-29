import axios from 'axios';
import React from 'react';
import Redirect from 'react-router';

const initialState = {
  username: '', // User's email address, a unique identifier
  isLoading: false, // Indicates whether the application is currently loading content
  physician: '', // Indicates whether the current user is a physician (as opposed to a patient)
  patients: [], // An array of all non-physician users in the database.
  providers: [], // An array of all provider-permissioned users in the database.
  medicationsMaster: [], // An array made up of all rows from Users and Medications joined.
  visitsMaster: [], // An array made up of all rows from Users, Visits, and Physicians joined.
  visits: [],
};

// AUTHENTICATION ACTION TYPES
const INITIAL_AUTHENTICATION = 'INITIAL_AUTHENTICATION';
const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
const PHYSICIAN_AUTHENTICATION = 'PHYSICIAN_AUTHENTICATION';

// DATA MANIPULATION AND RETRIEVAL ACTION TYPES
const RETRIEVE_PATIENTS = 'RETRIEVE_PATIENTS';
const RETRIEVE_PROVIDERS = 'RETRIEVE_PROVIDERS';
const RETRIEVE_MEDICATIONS_MASTER = 'RETRIEVE_MEDICATIONS_MASTER';
const RETRIEVE_VISITS_MASTER = 'RETRIEVE_VISITS_MASTER';
const RETRIEVE_VISITS = 'RETRIEVE_VISITS';

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

    case `${RETRIEVE_VISITS_MASTER}_PENDING`:
      return {...state, isLoading: true};

    case `${RETRIEVE_VISITS_MASTER}_FULFILLED`:
      return {...state, visitsMaster: action.payload, isLoading: false};

    case `${RETRIEVE_VISITS}_PENDING`:
      return {...state, visits: action.payload, isLoading: true};

    case `${RETRIEVE_VISITS}_FULFILLED`:
      return {...state, visits: action.payload, isLoading: false};

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

export const retrieveVisitsMaster = () => ({
  type: RETRIEVE_VISITS_MASTER,
  payload: axios
    .get('/providers/data/visits-master')
    .then(res => res.data)
    .catch(err => console.log(err)),
});

// export const retrieveVisits = username => ({
//   type: RETRIEVE_VISITS,
//   payload: axios
//     .get(`/patients/data/visits/${username}`)
//     .then(res => res.data)
//     .catch(err => console.log(err)),
// });

export const retrieveVisits = () => ({
  type: RETRIEVE_VISITS,
  payload: axios
    .get('/patients/data/visits/tunafish@swordfish.com')
    .then(res => res.data)
    .catch(err => console.log(err)),
});
