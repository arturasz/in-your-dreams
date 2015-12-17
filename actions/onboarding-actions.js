'user strict';

var React = require('react-native');
var { AsyncStorage } = React;

var STORAGE_KEY = '@InYourDreams:onboarding';

export const REQUEST_ONBOARDING = 'REQUEST_ONBOARDING';
function requestOnboarding() {
  return {
    type: REQUEST_ONBOARDING
  }
}

export const RECEIVE_ONBOARDING = 'RECEIVE_ONBOARDING';
function receiveOnboarding(result) {
  return {
    type: RECEIVE_ONBOARDING,
    result
  }
}

export function fetchOnboarding() {
  return dispatch => {
    dispatch(requestOnboarding());
    return AsyncStorage.getItem(STORAGE_KEY)
      .then(result => {
        dispatch(receiveOnboarding(!!result))
      })
  }
}

export const REQUEST_SAVE_ONBOARDING = 'REQUEST_SAVE_ONBOARDING';
function requestSaveOnboarding() {
  return {
    type: REQUEST_SAVE_ONBOARDING
  }
}

export const RECEIVE_SAVE_ONBOARDING = 'RECEIVE_SAVE_ONBOARDING';
function receiveSaveOnboarding() {
  return {
    type: RECEIVE_SAVE_ONBOARDING
  }
}

export function saveOnboarding() {
  return dispatch => {
    dispatch(requestSaveOnboarding());
    return AsyncStorage.setItem(STORAGE_KEY, '1')
      .then(dispatch(receiveSaveOnboarding()))
  }
}
