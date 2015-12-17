'use strict';

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    user
  }
}

export const REQUEST_USER_PROFILE = 'REQUEST_USER_PROFILE';
function requestUserProfile(user) {
  return {
    type: REQUEST_USER_PROFILE,
    user
  }
}

export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE';
function receiveUserProfile(user, profile) {
  return {
    type: RECEIVE_USER_PROFILE,
    user,
    profile
  }
}

export function fetchUserProfile(user) {
  return dispatch => {
    dispatch(requestUserProfile(user));
    return fetch('fetch user profile')
      .then(response => response.json)
      .then(profile => {
        dispatch(receiveUserProfile(user, profile))
      })
  }
}

export const REQUEST_SAVE_PROFILE = 'REQUEST_SAVE_PROFILE';
function requestSaveProfile() {
  return {
    type: REQUEST_SAVE_PROFILE
  }
}

export const RECEIVE_SAVE_PROFILE = 'RECEIVE_SAVE_PROFILE';
function receiveSaveProfile() {
  return {
    type: RECEIVE_SAVE_PROFILE
  }
}

export function saveUserProfile() {
  return (dispatch, getState) => {
    dispatch(requestSaveProfile());
    let profile = getState().profile;
    return fetch('save profile')
      .then(() => {
        dispatch(receiveSaveProfile())
      })
  };
}
