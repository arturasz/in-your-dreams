'use strict';
import React from 'react-native';
const {
  Component,
  Image,
  TouchableOpacity
  } = React;

export default class MenuCloseButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={this.props.style} underlayColor={'transparent'}>
        <Image
          source={require('../images/button-menu-close.png')}
          style={{ width: 12, height: 12 }}/>
      </TouchableOpacity>
    );
  }
}
