'use strict';
import React from 'react-native';
const {
  Component,
  Image,
  TouchableOpacity
  } = React;

export default class BackButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} underlayColor={'transparent'}>
        <Image
          source={require('../images/button-back.png')}
          style={[{ width: 17, height: 14 }, this.props.style]}/>
      </TouchableOpacity>
    );
  }
}
