'user strict';

export const REQUEST_LEADER_BOARD = 'REQUEST_LEADER_BOARD';
export const RECEIVE_LEADER_BOARD = 'RECEIVE_LEADER_BOARD';

function requestLeaderBoard() {
  return {
    type: REQUEST_LEADER_BOARD
  }
}

function receiveLeaderBoard(result) {
  return {
    type: RECEIVE_LEADER_BOARD,
    result
  }
}

export function fetchLeaderBoard() {
  return dispatch => {
    dispatch(requestLeaderBoard());
    return fetch('https://in-your-dreams.herokuapp.com/api/mostvoted')
      .then(response => response.json())
      .then(dreams => dreams.map((dream) => {
        dream.idea.image = JSON.parse(dream.idea.image);
        return dream;
      }))
      .then(dreams => dispatch(receiveLeaderBoard(dreams)));
  }
}
