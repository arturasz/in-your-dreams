'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, TouchableHighlight, PropTypes} = React;
var Button = require('react-native-button');
var { connect } = require('react-redux/native');

class Launch extends React.Component {

  componentDidMount() {
    let Actions = this.props.routes;
    console.log(this.props);
    if (this.props.user) {
      console.log('go home');
      Actions.home();
    } else {
      console.log('go login');
      Actions.login();
    }
  }

  render() {
    var Actions = this.props.routes;
    return (
      <View style={styles.container}>
        <Text>In Progress: {this.props.isInProgress ? 'yes' : 'no'}</Text>
        <Button onPress={()=>Actions.login({data:"Custom data", title:'Custom title' })}>Go to Login page</Button>
        <Button onPress={Actions.home}>Go to Home page</Button>
        <Button onPress={Actions.register}>Go to Register page</Button>
        <Button onPress={Actions.register2}>Go to Register page without animation</Button>
        <Button onPress={()=>Actions.error("Error message")}>Go to Error page</Button>
      </View>
    );
  }
}

Launch.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  }
});

function mapStateToProps(state) {
  console.log(state);
  const {
    user = {}
  } = state.rootReducer.user;

  return {
    user
  };
}

export default connect(mapStateToProps)(Launch);