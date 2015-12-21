'user strict';

export const REQUEST_ITS_A_MATCH = 'REQUEST_ITS_A_MATCH';
export const RECEIVE_ITS_A_MATCH = 'RECEIVE_ITS_A_MATCH';
export const REQUEST_HIDE_DREAM = 'REQUEST_HIDE_DREAM';
export const RECEIVE_HIDE_DREAM = 'RECEIVE_HIDE_DREAM';

function requestItsAMatch() {
  return {
    type: REQUEST_ITS_A_MATCH
  }
}

function receiveItsAMatch(result) {
  return {
    type: RECEIVE_ITS_A_MATCH,
    result
  }
}

function requestHideDream(dream) {
  return {
    type: REQUEST_HIDE_DREAM,
    dream
  }
}

function receiveHideDream(dream) {
  return {
    type: RECEIVE_HIDE_DREAM,
    dream
  }
}

export function fetchItsAMatch() {
  return (dispatch, getState) => {
    dispatch(requestItsAMatch());
    let user = getState().rootReducer.user;
    return fetch(`https://in-your-dreams.herokuapp.com/api/itsamatch/${user.email}`)
      .then(response => response.json())
      .then(dreams => dreams.map((dream) => {
        dream.idea.image = JSON.parse(dream.idea.image);
        return dream;
      }))
      .then(dreams => dispatch(receiveItsAMatch(dreams)));
  }
}

export function fetchHideDream(dream) {
  return (dispatch, getState) => {
    dispatch(requestHideDream(dream));
    let user = getState().rootReducer.user;
    return fetch(`https://in-your-dreams.herokuapp.com/api/hide`, {
      method: 'POST',
      body: JSON.stringify({
        id: dream.ideaId,
        email: user.email
      })
    }).then(() => dispatch(receiveHideDream(dream)));
  }
}
