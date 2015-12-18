'use strict';
import React from 'react-native';
const {
  Component,
  Image,
  TouchableOpacity
  } = React;

export default class MenuButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          source={require('../images/button-menu.png')}
          style={[{ width: 15, height: 10 }, this.props.style]}/>
      </TouchableOpacity>
    );
  }
}
