'use strict';

var React = require('react-native');
var {View, TouchableHighlight, Text, StyleSheet, Image,
     AppRegistry,
     ScrollView,
     ListView,
     Animated
    } = React;
var Button = require('react-native-button');
var {Actions} = require('react-native-redux-router');
var { connect } = require('react-redux/native');
var Dimensions = require('Dimensions');

var {
  width,
  height

}= Dimensions.get('window');

var GREY = 0;
var GREEN = 1;
var RED = 2;

var values = [1,2,3,4];
var AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
class Home extends React.Component {
  _animateScroll(e) {
    var threshold = width / 5;
    var x = e.nativeEvent.contentOffset.x;
    var target = null;
    x = x ;
    if (x > -50 && x < 50 && this._target != GREY) {
      target = GREY;
    } else if (x < -50  && this._target != GREEN) {
      target = RED;
    } else if (x > 50 && this._target != RED) {
      target = GREEN;
    }
    if (target !== null) {
      this._target = target;
      this._targetIndex = 0;
      Animated.timing(this.state.colors[0], {
        toValue: target,
        duration: 0,
      }).start();
    }
  }
  takeAction(id) {
    this.setState({
      action: true
    });
    var action = this.getAction();
    if (action === RED) {
      this.markAsBoring(id);
    } else if (action == GREEN) {
      this.markAsAwesome(id);
    }
  }
  getAction() {
    if (this.state.action) {
      return this._target
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.target = null;
    this.state = {
      values: values,
      colors: values.map( () => new Animated.Value(GREY) )
    }
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
      })
      .catch((error) => {
        console.warn(error);
      });
    this.redirectOrShowNext();
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

    if (!this.state.dreams) {
      return this.renderLoading();
    }

    if (!this.state.dreams.length) {
      return this.redirectToScoreBoard();
    }

    return this.renderFirst();

  };

  renderFirst() {
    var bgColor = this.state.colors[0].interpolate({
      inputRange: [
        GREY,
        GREEN,
        RED
      ],
      outputRange: [
        'rgb(255, 255, 255)',
        'rgba(214, 255, 214, 1)',
        'rgba(255, 214, 214, 1)',
      ],
    });
    return (
      <View style={{flex: 1}}>
        <View style={styles.backgroundColoring}>
          <View style={{ backgroundColor: '#114977', flex: 10 }}>
            <Image
               style={{flex: 1, width: null, height: null}}
               source={require('../images/background-home.png')}
               />
          </View>
          <View style={{backgroundColor: '#93c66d', flex: 4}}>
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
            <AnimatedScrollView
               horizontal={true}
               directionalLockEnabled={true}
               style={[{ flex: 1 }, { backgroundColor: bgColor }]}
               onScroll={this._animateScroll.bind(this)}
               scrollEventThrottle={16}
               onMomentumScrollBegin={this.takeAction.bind(this, this.state.dreams[0].id)}
               >
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
                  <View style={ styles.separator }><Text>||</Text></View>
                  
                  <TouchableHighlight
                     style={styles.button}
                     onPress={() => this.markAsAwesome(this.state.dreams[0].id)}>
                    <Image source={require('../images/like.png')} style={styles.buttonImage} />
                  </TouchableHighlight>
                </View>

              </View>
            </AnimatedScrollView>
          </View>
        </View>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  imageShadow: {
    overflow: 'hidden',
    flex: 21,
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
  separator: {
    opacity: 0.1,
    width: 2,
    marginTop: 2,
    marginBottom: 2,
    backgroundColor: '#000000',
    flex: 0,
    alignSelf: 'center'
  },
  absoluteContainer2: {
    shadowOpacity: 0.4,
    shadowRadius: 30,
    shadowColor: '#000000',
    opacity: 0.3,
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 50,
    marginRight: 50,
  },
  absoluteContainer1: {
    shadowOpacity: 0.4,
    shadowRadius: 30,
    shadowColor: '#000000',
    opacity: 0.5,
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 34,
    marginRight: 34
  },
  containerShadow: {
    flex: 45,
    shadowOpacity: 0.2,
    shadowRadius: 30,
    shadowColor: '#000000',
    margin: 20,
    marginTop: 0,
  },
  container: {
    height: 464, //we need to specify height because ScrollView doesnt work otherwise...
    width: 280, //we need to specify width because otherwise all layout breaks apart
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'stretch',
    overflow: 'hidden'
  },
  textPlaceholder: {
    shadowOpacity: 0.3,
    shadowRadius: 30,
    shadowColor: '#000000',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingTop: 15,
    paddingRight: 20,
    flex: 2
  },
  logo: {
    flex: 7,
    borderColor: 'pink'
  },
  title: {
    flex: 3,
    overflow: 'visible',
    fontSize: 16,
    opacity: 0.78,
    fontWeight: 'bold',
  },
  description: {
    flex: 8,
    lineHeight: 21,
    fontSize: 14,
    opacity: 0.68,
  },
  buttonContainer: {
    shadowOpacity: 0.1,
    shadowRadius: 15,
    flex: 3,
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

var AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default connect(mapStateToProps)(Home);
