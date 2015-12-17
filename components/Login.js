'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, PropTypes} = React;
var Button = require('react-native-button');
var GoogleSignin = require('react-native-google-signin');
var { connect } = require('react-redux/native');
import { fetchOnboarding } from '../actions/onboarding-actions.js';

class Login extends React.Component {
  componentDidMount() {
    this.props.fetchOnboarding();
  }

  render() {
    let Actions = this.props.routes;
    let SignIn = () => {
      GoogleSignin.signIn();
    };

    return (
      <View style={styles.container}>



        <Text>Login page: {this.props.data}</Text>
        <Button onPress={SignIn}>Sign In</Button>
        <Button onPress={Actions.pop}>Back</Button>
      </View>
    );
  }
}

Login.propTypes = {
  isInProgress: PropTypes.bool,
  onboarded: PropTypes.bool,
  dispatch: PropTypes.func
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
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

export default connect(mapStateToProps, {fetchOnboarding})(Login);
