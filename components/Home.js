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
      <View style={styles.background}>
        <View style={styles.absoluteContainer2}></View>
        <View style={styles.absoluteContainer1}></View>
        <View style={styles.containerShadow}>
          <View style={styles.container}>
            <View style={styles.imageShadow}>
              <Image
                 style={styles.logo}
                 source={this.state.dreams[0].image}
                 />
              <View style={styles.textPlaceholder}>
                <Text style={styles.title}>{this.state.dreams[0].title}</Text>
                <Text style={styles.description}>{this.state.dreams[0].description}</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button style={styles.button} onPress={() => this.markAsBoring(this.state.dreams[0].id)}>
                <Image source={require('../images/x.png')} style={styles.buttonImage} />
              </Button>
              <View style={ { width: 2, marginTop: 2, marginBottom: 2,  backgroundColor: '#000000' } }><Text>||</Text></View>
              <Button style={styles.button} onPress={() => this.markAsAwesome(this.state.dreams[0].id)}>
                <Image source={require('../images/like.png')} style={styles.buttonImage} />
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  imageShadow: {
    overflow: 'hidden',
    flex: 5,
  },
  background: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'blue',
    paddingTop: 30,
  },
  absoluteContainer2: {
    shadowOpacity: 0.2,
    shadowRadius: 30,
    shadowColor: '#000000',
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 60,
    marginRight: 60,
  },
  absoluteContainer1: {
    shadowOpacity: 0.2,
    shadowRadius: 30,
    shadowColor: '#000000',
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 40,
    marginRight: 40
  },
  containerShadow: {
    flex: 45,
    shadowOpacity: 0.2,
    shadowRadius: 30,
    shadowColor: '#000000',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    margin: 25,
    marginTop: 0,
    overflow: 'hidden'
  },
  textPlaceholder: {
    shadowOpacity: 0.3,
    shadowRadius: 30,
    shadowColor: '#000000',
    backgroundColor: '#ffffff',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    paddingLeft: 25,
    paddingTop: 25,
    flex: 2
  },
  logo: {
    flex: 3,
    borderColor: 'pink'
  },
  title: {
    flex: 1,
    fontSize: 16,
    opacity: 0.88,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 14,
    opacity: 0.88,
    flex: 4,
  },
  buttonContainer: {
    shadowOpacity: 0.1,
    shadowRadius: 15,
    backgroundColor: '#ffffff',
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    alignItems: 'center'
  }
});

module.exports = Home;
