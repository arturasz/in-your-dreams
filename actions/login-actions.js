'use strict';

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const REQUEST_USER_PROFILE = 'REQUEST_USER_PROFILE';
export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE';
export const REQUEST_SAVE_PROFILE = 'REQUEST_SAVE_PROFILE';
export const RECEIVE_SAVE_PROFILE = 'RECEIVE_SAVE_PROFILE';

export function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    user
  }
}

function requestUserProfile() {
  return {
    type: REQUEST_USER_PROFILE
  }
}

function receiveUserProfile(profile) {
  return {
    type: RECEIVE_USER_PROFILE,
    profile
  }
}

export function fetchUserProfile(user) {
  return dispatch => {
    dispatch(requestUserProfile());
    return fetch(`https://www.googleapis.com/plus/v1/people/me?access_token=${user.accessToken}`)
      .then(response => response.json())
      .then(profile => {
        dispatch(receiveUserProfile(profile));
      })
  }
}

function requestSaveProfile() {
  return {
    type: REQUEST_SAVE_PROFILE
  }
}

function receiveSaveProfile() {
  return {
    type: RECEIVE_SAVE_PROFILE
  }
}

export function saveUserProfile() {
  return (dispatch, getState) => {
    dispatch(requestSaveProfile());
    let state = getState().rootReducer;
    return fetch('https://in-your-dreams.herokuapp.com/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: state.user.email,
        displayName: state.user.name,
        profileImage: state.profile.image.url
      })
    }).then((response) => {
      dispatch(receiveSaveProfile())
    })
  };
}
