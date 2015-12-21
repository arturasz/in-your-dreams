import { connect } from 'react-redux/native';
import { fetchMyDreams } from '../actions/my-dreams-actions.js';
import DreamList from './DreamList.js';

function mapStateToProps(state) {
  console.log(state);
  const {
    loading = false,
    dreamList = []
    } = state.rootReducer.myDreams;

  return {
    loading,
    dreamList
  };
}

export default connect(mapStateToProps, {fetchDreamList: fetchMyDreams})(DreamList);
