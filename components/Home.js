'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, Image} = React;
var Button = require('react-native-button');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch('https://api.github.com/users/arturasz', {
      //method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   firstParam: 'yourValue',
      //   secondParam: 'yourOtherValue',
      // })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(responseJson);
      })
      .catch((error) => {
        console.warn(error);
      });
  };
  markAsBoring() {
    console.log('Boring')
  }

  markAsAwesome() {
    console.log('Awesome')
  }
  render() {
    let Actions = this.props.routes;
    let card = {};
    console.log(this)

    return (
      <View style={styles.container}>
        <Text>{this.state.name}</Text>
        <Image
           style={styles.logo}
           source={{uri: 'http://www.sarnies.net/_wp_generated/wpb7fe3174.png'}}
                 />
        <View style={styles.buttonContainer}>
          <Button onPress={this.markAsBoring}>Boring</Button>
          <Button onPress={this.markAsAwesome}>Amazing</Button>
        </View>
      </View>
    );
  };

}

var styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: 'pink'
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch'
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

module.exports = Home;
