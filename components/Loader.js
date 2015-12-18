'use strict';

var React = require('react-native');
var {View, StyleSheet, Image} = React;

class Loader extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../images/loading.png')} style={styles.background}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  background: {
    flex: 1
  }
});

export default Loader;
