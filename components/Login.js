'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, PropTypes, Image, TouchableHighlight} = React;
var Button = require('react-native-icon-button');
var GoogleSignin = require('react-native-google-signin');
var { connect } = require('react-redux/native');
var Carousel = require('react-native-carousel');
import { fetchOnboarding } from '../actions/onboarding-actions.js';

class Login extends React.Component {
  componentDidMount() {
    this.props.fetchOnboarding();
  }

  render() {
    let SignIn = () => {
      GoogleSignin.signIn();
    };

    if (this.props.onboarded === true) {
      return (<View style={styles.container}>
        <Image source={require('../images/login.png')} style={styles.background}>
          <TouchableHighlight onPress={SignIn} underlayColor={'transparent'} style={styles.touchableHighlight}>
            <Image
              style={styles.button}
              source={require('../images/button-login.png')}
              />
          </TouchableHighlight>
        </Image>
      </View>);
    }

    return (
      <Carousel
        indicatorAtBottom={true}
        indicatorPosition={50}
        indicatorSize={30}
        indicatorColor={'#59ad53'}
        inactiveIndicatorColor={'#474956'}
        loop={false}
        animate={false}>
        <View style={styles.container}>
          <Image source={require('../images/onboarding-1.png')} style={styles.background} />
        </View>
        <View style={styles.container}>
          <Image source={require('../images/onboarding-2.png')} style={styles.background} />
        </View>
        <View style={styles.container}>
          <Image source={require('../images/onboarding-3.png')} style={styles.background}>
            <TouchableHighlight onPress={SignIn} underlayColor={'transparent'} style={styles.touchableHighlight}>
              <Image
                style={styles.button}
                source={require('../images/button-login.png')}
                />
            </TouchableHighlight>
          </Image>
        </View>
      </Carousel>
    )
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

export default connect(mapStateToProps, {fetchOnboarding})(Login);
