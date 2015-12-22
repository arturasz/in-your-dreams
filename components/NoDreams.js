'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, PropTypes, Image, TouchableHighlight} = React;
var Button = require('react-native-icon-button');
var GoogleSignin = require('react-native-google-signin');
var { connect } = require('react-redux/native');

class NoDreams extends React.Component {
  render() {
    let Actions = this.props.routes;
    return (
      <View style={styles.container}>
        <View style={styles.phText}>
          <Text style={ [styles.text, {marginTop: 50}]}>Congratulations!</Text>
          <Text style={styles.text}>You are done!</Text>
        </View>
        <View style={styles.phImage}>
          <Image
             source={require('../images/cactus.png')}
             />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight style={styles.button} onPress={Actions.create}><Text style={styles.buttonText}>Add Your Dream</Text></TouchableHighlight>
          <TouchableHighlight style={[styles.button, {backgroundColor: '#cdcdcd' }]} onPress={Actions.leaderBoard}><Text style={styles.buttonText}>Go to Top Rated Dreams</Text></TouchableHighlight>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  phText: {
    flex:2,
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    opacity: 0.78,
    textAlign: 'center',
    flex:0
  },

  phImage: {
    width: 196,
    height: 177,
    flex: 3,
  },
  background: {
    flex: 1
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    flex: 3,
  },
  buttonText: {
    color: 'white',
  },
  button: {
    height: 50,
    width: 280,
    marginBottom: 20,
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
    backgroundColor: '#3591df',
  },
});


export default connect()(NoDreams);
