'user strict';

export const REQUEST_MY_DREAMS = 'REQUEST_MY_DREAMS';
export const RECEIVE_MY_DREAMS = 'RECEIVE_MY_DREAMS';

function requestMyDreams() {
  return {
    type: REQUEST_MY_DREAMS
  }
}

function receiveMyDreams(result) {
  return {
    type: RECEIVE_MY_DREAMS,
    result
  }
}

export function fetchMyDreams() {
  return (dispatch, getState) => {
    dispatch(requestMyDreams());
    let user = getState().rootReducer.user;
    console.log(user);
    return fetch(`https://in-your-dreams.herokuapp.com/api/myideas/${user.email}`)
      .then(response => response.json())
      .then(dreams => {
        dispatch(receiveMyDreams(dreams));
      })
  }
}
