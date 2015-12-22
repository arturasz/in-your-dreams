'use strict';
import React from 'react-native';
const {
  Component,
  Image,
  TouchableOpacity
  } = React;

export default class CreateDreamButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} underlayColor={'transparent'}>
        <Image
          source={require('../images/button-create.png')}
          style={[{ width: 20, height: 20 }, this.props.style]}/>
      </TouchableOpacity>
    );
  }
}
