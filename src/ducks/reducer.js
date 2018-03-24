import axios from 'axios';
import react from 'react';
import Redirect from 'react-router';

const initialState = {
  username: '', // User's email address, a unique identifier
  isLoading: false, // Indicates whether the application is currently loading content
};

// AUTHENTICATION ACTION TYPES
const INITIAL_AUTHENTICATION = 'INITIAL_AUTHENTICATION';
const AUTHENTICATE_USER = 'AUTHENTICATE_USER';

// APPLICATION ACTION TYPES
// const UPDATE_ADDRESS = 'UPDATE_ADDRESS';

// REDUCER
export default function reducer(state = initialState, action) {
  console.log('REDUCER HIT: ', action);

  switch (action.type) {
    case INITIAL_AUTHENTICATION:
      return {...state, username: action.payload};

    case `${AUTHENTICATE_USER}_PENDING`:
      return {...state, isLoading: true};

    case `${AUTHENTICATE_USER}_FULFILLED`:
      return {...state, username: action.payload, isLoading: false};

    default:
      return state;
  }
}

// ACTION CREATORS
export function authenticationInitial(username) {
  return {
    type: INITIAL_AUTHENTICATION,
    payload: username,
  };
}

export const userAuthenticate = () => ({
  type: AUTHENTICATE_USER,
  payload: axios
    .get('/authentication/session')
    .then(response => response.data.emails[0].value)
    .catch(err => console.log(err)),
});
