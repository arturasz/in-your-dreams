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
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.debug('Received', responseJson)
        this.setState({
          dreams: responseJson.map((obj) => {
            obj.image = JSON.parse(obj.image);
            return obj;
          })});
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  vote(id, status) {
    fetch('https://in-your-dreams.herokuapp.com/api/ideas', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ideaId: id,
        date: Date.now().toString(),
        userId: 'TODO', //TODO: userId
        vote: status
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.debug('Received', responseJson)
        this.redirectOrShowNext();
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  markAsBoring(id) {
    this.vote(id, 'downVote')
    console.log('Boring')
  }

  redirectOrShowNext() {
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
  }

  markAsAwesome(id) {
    console.log(id);
    this.vote(id, 'upVote')
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
    this.props.routes.create();
  }

  renderFirst() {
    return (
      <View style={styles.container}>
        <Text>{this.state.dreams[0].title}</Text>
        <Image
           style={styles.logo}
           source={this.state.dreams[0].image}
           />
        <Text>{this.state.dreams[0].description}</Text>
        <View style={styles.buttonContainer}>
          <Button onPress={() => this.markAsBoring(this.state.dreams[0].id)}>Boring</Button>
          <Button onPress={() => this.markAsAwesome(this.state.dreams[0].id)}>Amazing</Button>
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
