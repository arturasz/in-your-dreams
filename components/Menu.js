'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, PropTypes, Image, TouchableHighlight} = React;
var { connect } = require('react-redux/native');
import { fetchOnboarding } from '../actions/onboarding-actions.js';
import Loader from './Loader.js';
import MenuCloseButton from './MenuCloseButton.js';
import LogoutButton from './LogoutButton.js';

class Menu extends React.Component {
  render() {
    let Actions = this.props.routes;
    return (
      <View>
        <Image source={require('../images/menu.png')}>
          <MenuCloseButton onPress={Actions.pop} style={styles.menuCloseButton}/>

          <View style={styles.navigationContainer}>
            <TouchableHighlight onPress={Actions.create} style={styles.navigationLink}>
              <Text style={styles.navigationLinkText}>Add dream</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={Actions.error} style={styles.navigationLink}>
              <Text style={styles.navigationLinkText}>Leader Board</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={Actions.home} style={styles.navigationLink}>
              <Text style={styles.navigationLinkText}>Wix Dreams</Text>
            </TouchableHighlight>
          </View>

          <LogoutButton onPress={Actions.login} style={styles.logoutButton}/>

        </Image>
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
  menuCloseButton: {
    top: 30,
    left: 30
  },
  navigationContainer: {
    top: 162,
    left: 40,
  },
  navigationLink: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center'
  },
  navigationLinkText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#ffffff'
  },
  logoutButton: {
    left: 40,
    top: 260
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
