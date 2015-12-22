'user strict';

export const REQUEST_IDEAS = 'REQUEST_IDEAS';
export const RECEIVE_IDEAS = 'RECEIVE_IDEAS';

function requestIdeas() {
  return {
    type: REQUEST_IDEAS
  }
}

function receiveIdeas(result) {
  return {
    type: RECEIVE_IDEAS,
    result
  }
}

export function fetchIdeas() {
  return (dispatch, getState) => {
    dispatch(requestIdeas());
    let user = getState().rootReducer.user;
    return fetch(`https://in-your-dreams.herokuapp.com/api/ideas/${user.email}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch(receiveIdeas(responseJson.map((obj) => {
          obj.image = JSON.parse(obj.image);
          return obj;
        })));
      })
      .catch((error) => {
        console.warn(error);
      });
  }
}
