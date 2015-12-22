'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, PropTypes, Image, ListView, ActivityIndicatorIOS} = React;
import _ from 'lodash'
import { combineReducers } from 'redux'
import { USER_LOGGED_IN, RECEIVE_USER_PROFILE } from './actions/login-actions.js'
import { REQUEST_ONBOARDING, RECEIVE_ONBOARDING, REQUEST_SAVE_ONBOARDING, RECEIVE_SAVE_ONBOARDING } from './actions/onboarding-actions.js'
import { REQUEST_MY_DREAMS, RECEIVE_MY_DREAMS } from './actions/my-dreams-actions'
import { REQUEST_LEADER_BOARD, RECEIVE_LEADER_BOARD } from './actions/leader-board-actions'
import { REQUEST_ITS_A_MATCH, RECEIVE_ITS_A_MATCH, REQUEST_HIDE_DREAM, RECEIVE_HIDE_DREAM } from './actions/its-a-match-actions'

function user(state = {}, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return Object.assign({}, state, action.user);
    default:
      return state
  }
}

function profile(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USER_PROFILE:
      return Object.assign({}, state, action.profile);
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

function myDreams(state = {}, action) {
  switch (action.type) {
    case REQUEST_MY_DREAMS:
      return Object.assign({}, state, {
        loading: true,
        dreamList: []
      });
    case RECEIVE_MY_DREAMS:
      return Object.assign({}, state, {
        loading: false,
        dreamList: action.result,
        statistics: {
          upVotes: _(action.result).reduce((total, dream) => {
            return total + dream.upVotes;
          }, 0),
          downVotes: _(action.result).reduce((total, dream) => {
            return total + dream.downVotes;
          }, 0)
        }
      });

    default:
      return state
  }
}

function leaderBoard(state = {}, action) {
  switch (action.type) {
    case REQUEST_LEADER_BOARD:
      return Object.assign({}, state, {
        loading: true,
        dreamList: []
      });
    case RECEIVE_LEADER_BOARD:
      return Object.assign({}, state, {
        loading: false,
        dreamList: action.result
      });

    default:
      return state
  }
}

function itsAMatch(state = {}, action) {
  switch (action.type) {
    case REQUEST_ITS_A_MATCH:
      return Object.assign({}, state, {
        loading: true,
        dreamList: []
      });
    case RECEIVE_ITS_A_MATCH:
      return Object.assign({}, state, {
        loading: false,
        dreamList: action.result
      });

    default:
      return state
  }
}

const rootReducer = combineReducers({
  user,
  profile,
  onboarding,
  myDreams,
  leaderBoard,
  itsAMatch
});

export default rootReducer
