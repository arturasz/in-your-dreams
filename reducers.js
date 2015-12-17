'use strict';

import { combineReducers } from 'redux'
import { USER_LOGGED_IN, RECEIVE_USER_PROFILE } from './actions/login-actions.js'
import { REQUEST_ONBOARDING, RECEIVE_ONBOARDING, REQUEST_SAVE_ONBOARDING, RECEIVE_SAVE_ONBOARDING } from './actions/onboarding-actions.js'


function user(state = {}, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return Object.assign({}, state, {
        user: action.user
      });
    default:
      return state
  }
}

function profile(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USER_PROFILE:
      return Object.assign({}, state, {
        profile: action.profile
      });
    default:
      return state
  }
}

function onboarding(state = {}, action) {
  switch (action.type) {
    case REQUEST_ONBOARDING:
      return Object.assign({}, state, {
        isInProgress: true
      });
    case RECEIVE_ONBOARDING:
      return Object.assign({}, state, {
        isInProgress: false,
        onboarded: action.result
      });
    case REQUEST_SAVE_ONBOARDING:
      return Object.assign({}, state, {
        isInProgress: true
      });
    case RECEIVE_SAVE_ONBOARDING:
      return Object.assign({}, state, {
        isInProgress: false,
        onboarded: true
      });

    default:
      return state
  }
}

const rootReducer = combineReducers({
  user,
  profile,
  onboarding
});

export default rootReducer
