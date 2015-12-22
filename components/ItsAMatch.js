'use strict';

var React = require('react-native');
var {View, Image, TouchableHighlight} = React;

class ItsAMatch extends React.Component {
  render() {
    let Actions = this.props.routes;
    return (
      <View style={{flex: 1}}>
        <TouchableHighlight style={{flex: 1}} underlayColor={'transparent'} onPress={Actions.pop}>
          <Image style={{flex: 1}} resizeMode={Image.resizeMode.cover} source={require('../images/its-a-match.png')} />
        </TouchableHighlight>
      </View>
    );
  }
}

export default ItsAMatch;
