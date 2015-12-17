'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, Image} = React;
var Button = require('react-native-button');
var {Actions} = require('react-native-redux-router');

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch('https://in-your-dreams.herokuapp.com/api/ideas', {
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
        console.debug('Received', responseJson)
        this.setState({dreams: responseJson});
      })
      .catch((error) => {
        console.warn(error);
      });
  };
  markAsBoring() {
    this.markAsAwesome();
    //TODO: post boring
    console.log('Boring')
  }

  markAsAwesome() {
    if (this.state.dreams.length === 1) {
      this.props.routes.create();
    }
    else {
      this.setState(function(state) {
        console.log(this.state.dreams)
        state.dreams.shift();
        console.log(this.state.dreams)
        console.log(this.state.dreams.length)
        return state;
      });
    }

    //TODO: post awesome
    console.log('Awesome')
  }

  renderLoading() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  redirectToScoreBoard() {
    console.log(this.props.routes)
    this.props.routes.register();
  }

  renderFirst() {
    return (
      <View style={styles.container}>
        <Text>{this.state.dreams[0].title}</Text>
        <Image
           style={styles.logo}
           source={{uri: 'http://www.sarnies.net/_wp_generated/wpb7fe3174.png'}}
           />
        <Text>{this.state.dreams[0].description}</Text>
        <View style={styles.buttonContainer}>
          <Button onPress={() => this.markAsBoring()}>Boring</Button>
          <Button onPress={() => this.markAsAwesome()}>Amazing</Button>
        </View>
      </View>
    );
  }

  render() {
    let card = {};

    if (!this.state) {
      return this.renderLoading();
    }

    console.log(this.state.dreams);
    console.log(this.state.dreams.length);
    if (!this.state.dreams.length) {
      return this.redirectToScoreBoard();
    }

    return this.renderFirst();

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
