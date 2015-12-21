'use strict';

var React = require('react-native');
var {View, TouchableHighlight, Text, StyleSheet, Image} = React;
var Button = require('react-native-button');
var {Actions} = require('react-native-redux-router');
var { connect } = require('react-redux/native');

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch('https://in-your-dreams.herokuapp.com/api/ideas/' +  this.props.user.email, {
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
        userId: this.props.user.email,
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
      <View style={{flex: 1}}>
        <View style={styles.backgroundColoring}>
          <View style={{backgroundColor: '#F5F5F5', flex: 5}}>
          </View>
          <View style={{backgroundColor: '#297ec6', flex: 2}}>
          </View>
          <View style={{backgroundColor: '#3899ec', flex: 3}}>
          </View>
        </View>
        <View style={styles.background}>
          {function(){
            if (this.state.dreams.length > 2) {
              return <View style={styles.absoluteContainer2}></View>
            }
          }.call(this)}
          {function(){
            if (this.state.dreams.length > 1) {
              return <View style={styles.absoluteContainer1}></View>
            }
          }.call(this)}

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
                <TouchableHighlight
                   style={styles.button}
                   onPress={() => this.markAsBoring(this.state.dreams[0].id)}>
                  <Image source={require('../images/x.png')} style={styles.buttonImage} />
                </TouchableHighlight>
                <View style={ {opacity: 0.1, width: 2, marginTop: 2, marginBottom: 2,  backgroundColor: '#000000' } }><Text>||</Text></View>
                <TouchableHighlight
                   style={styles.button}
                   onPress={() => this.markAsAwesome(this.state.dreams[0].id)}>
                  <Image source={require('../images/like.png')} style={styles.buttonImage} />
                </TouchableHighlight>
              </View>

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
  backgroundColoring: {
    position: 'absolute',
    top:0,
    bottom:0,
    right: 0,
    left: 0,
  },
  background: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 20,
  },
  absoluteContainer2: {
    shadowOpacity: 0.4,
    shadowRadius: 30,
    shadowColor: '#000000',
    opacity: 0.6,
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 60,
    marginRight: 60,
  },
  absoluteContainer1: {
    shadowOpacity: 0.4,
    shadowRadius: 30,
    shadowColor: '#000000',
    opacity: 0.8,
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 40,
    marginRight: 40
  },
  containerShadow: {
    flex: 45,
    shadowOpacity: 0.4,
    shadowRadius: 30,
    shadowColor: '#000000',
    margin: 20,
    marginTop: 0,
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    overflow: 'hidden'
  },
  textPlaceholder: {
    shadowOpacity: 0.3,
    shadowRadius: 30,
    shadowColor: '#000000',
    backgroundColor: '#ffffff',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 20,
    flex: 2
  },
  logo: {
    flex: 4,
    borderColor: 'pink'
  },
  title: {
    flex: 1,
    fontSize: 18,
    opacity: 0.78,
    fontWeight: 'bold'
  },
  description: {
    marginTop: 10,
    flex: 4,
    lineHeight: 24,
    fontSize: 16,
    opacity: 0.68,
  },
  buttonContainer: {
    shadowOpacity: 0.1,
    shadowRadius: 15,
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'space-around'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonImage: {
  }
});

function mapStateToProps(state) {
  const {
    user = {}
  } = state.rootReducer;

  return {
    user
  };
}

export default connect(mapStateToProps)(Home);
