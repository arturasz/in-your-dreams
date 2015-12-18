'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, PropTypes, Image, TouchableHighlight} = React;
var { connect } = require('react-redux/native');
import { fetchOnboarding } from '../actions/onboarding-actions.js';
import Loader from './Loader.js';

class Menu extends React.Component {
  render() {
    return (
      <View>
        <Text>Menu</Text>
      </View>
    )
  }
}

Menu.propTypes = {
  loading: PropTypes.bool,
  onboarded: PropTypes.bool,
  dispatch: PropTypes.func
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#b3d395'
  },
  background: {
    flex: 1
  },
  touchableHighlight: {
    height: 50,
    top: 382
  },
  button: {
    alignSelf: 'center'
  }
});

function mapStateToProps(state) {
  const {
    isInProgress = false,
    onboarded = false
    } = state.rootReducer.onboarding;

  return {
    isInProgress,
    onboarded
  };
}

export default connect(mapStateToProps, {fetchOnboarding})(Menu);
