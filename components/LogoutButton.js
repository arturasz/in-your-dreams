'use strict';
import React from 'react-native';
import GoogleSignin from 'react-native-google-signin';
const {
  Component,
  Image,
  TouchableOpacity
  } = React;

export default class LogoutButton extends Component {
  render() {
    let onPress = () => {
      GoogleSignin.signOut();
      if (this.props.onPress) {
        this.props.onPress();
      }
    };

    return (
      <TouchableOpacity onPress={onPress} style={this.props.style}>
        <Image source={require('../images/button-logout.png')} />
      </TouchableOpacity>
    );
  }
}
