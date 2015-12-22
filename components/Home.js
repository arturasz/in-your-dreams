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
var { fetchIdeas, vote } = require('../actions/ideas-actions.js');
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
    this.props.fetchIdeas().then(() => {
      if(!this.props.ideas.length) {
        this.props.routes.noDreams();
      }
    });
  };

  vote(id, status) {
    this.props.vote(id, status)
    this.redirectOrShowNext();
  }

  markAsBoring(id) {
    this.vote(id, 'downVote')
  }

  redirectOrShowNext() {
    if (this.props.ideas.length === 1) {
      this.props.routes.noDreams();
    }
    else {
      this.setState(function(state) {
        this.props.ideas.shift();
        return state;
      });
    }
  }

  markAsAwesome(id) {
    this.vote(id, 'upVote')
  }

  renderLoading() {
    return (
      <View style={{flex: 1}}>
        <Image source={require('../images/loading.png')} style={{flex: 1, width: null, height: null}}/>
      </View>
    );
  }

  redirectToScoreBoard() {
    this.props.routes.create();
  }

  render() {
    let card = {};

    if (!this.props.ideas.length) {
      return this.renderLoading();
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
          <View style={styles.buttonContainer}>
            <TouchableHighlight
               style={styles.button}
               underlayColor='transparent'
               onPress={() => this.markAsBoring(this.props.ideas[0].id)}>
              <Image source={require('../images/x.png')} style={styles.buttonImage} />
            </TouchableHighlight>
            <View style={ styles.separator }><Text>||</Text></View>
            
            <TouchableHighlight
               style={styles.button}
               underlayColor='transparent'
               onPress={() => this.markAsAwesome(this.props.ideas[0].id)}>
              <Image source={require('../images/like.png')} style={styles.buttonImage} />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.background}>
          <View style={styles.absoluteContainer2}></View>
          <View style={styles.absoluteContainer1}></View>

          <View style={styles.containerShadow}>
            <AnimatedScrollView
               horizontal={true}
               showsVerticalScrollIndicator={false}
               showsHorizontalScrollIndicator={false}
               directionalLockEnabled={true}
               style={[styles.animatedScrollView, { backgroundColor: bgColor }]}
               onScroll={this._animateScroll.bind(this)}
               scrollEventThrottle={16}
               onMomentumScrollBegin={this.takeAction.bind(this, this.props.ideas[0].id)}
               >
              <View style={styles.container}>
                <View style={styles.imageShadow}>
                  <View
                     style={styles.logo}
                     >
                    <Image
                       style={styles.logo}
                       source={this.props.ideas[0].image}
                       />
                  </View>
                  <View style={styles.textPlaceholder}>
                    <Text style={styles.title}>{this.props.ideas[0].title}</Text>
                    <Text style={styles.description} numberOfLines={2}>{this.props.ideas[0].description}</Text>
                  </View>
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
    marginBottom:90,
  },
  separator: {
    opacity: 0.1,
    width: 2,
    marginTop: 2,
    marginBottom: 8,
    backgroundColor: '#000000',
    flex: 0,
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
  animatedScrollView: {
  },
  containerShadow: {
    flex: 45,
    shadowOpacity: 0.2,
    shadowRadius: 30,
    shadowColor: '#000000',
    marginLeft: 20,
    marginRight: 20,
  },
  container: {
    height: 380, //we need to specify height because ScrollView doesnt work otherwise...
    width: 280, //we need to specify width because otherwise all layout breaks apart
    flex: 1,
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
    flex: 6,
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
    backgroundColor: 'white', 
    shadowOpacity: 0.1,
    shadowRadius: 15,
    flex: 4,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingBottom: 20,
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
    user = {},
  } = state.rootReducer;

  const {
    ideas =[],
    loading= false
  } = state.rootReducer.ideas;

  return {
    user,
    ideas,
    loading
  };
}

var AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default connect(mapStateToProps, {fetchIdeas, vote})(Home);
