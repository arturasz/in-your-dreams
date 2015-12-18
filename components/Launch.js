'use strict';

var React = require('react-native');
var { PropTypes } = React;
var Button = require('react-native-button');
var { connect } = require('react-redux/native');
import Loader from './Loader.js';

class Launch extends React.Component {

  componentDidMount() {
    let Actions = this.props.routes;
    setTimeout(() => {
      Actions[this.props.user.email ? 'home' : 'login']();
    });
  }

  render() {
    return (<Loader />);
  }
}

Launch.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  const {
    user = {}
  } = state.rootReducer;

  return {
    user
  };
}

export default connect(mapStateToProps)(Launch);
