import { connect } from 'react-redux/native';
import { fetchLeaderBoard } from '../actions/leader-board-actions.js';
import DreamList from './DreamList.js';

function mapStateToProps(state) {
  const {
    loading = false,
    dreamList = []
    } = state.rootReducer.leaderBoard;

  return {
    loading,
    dreamList
  };
}

export default connect(mapStateToProps, {fetchDreamList: fetchLeaderBoard})(DreamList);
