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
    fetch('https://in-your-dreams.herokuapp.com/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ideaId: id,
        date: Date.now().toString(),
        userId: 'test', //TODO: userId
        vote: status
      })
    })
      .then(() => {
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

  renderFirst() {
    return (
      <View style={styles.container}>
        <Image
           style={styles.logo}
           source={this.state.dreams[0].image}
           />
        <Text style={styles.title}>{this.state.dreams[0].title}</Text>
        <Text>{this.state.dreams[0].description}</Text>
        <View style={styles.buttonContainer}>
          <Button onPress={() => this.markAsBoring(this.state.dreams[0].id)}>Boring</Button>
          <Button onPress={() => this.markAsAwesome(this.state.dreams[0].id)}>Amazing</Button>
        </View>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'pink'
  },
  title: {
    flex: 1,
    fontWeight: 'bold'
  },
  buttonContainer: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch'
  }
});

module.exports = Home;
