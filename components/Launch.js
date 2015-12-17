'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, PropTypes, Image} = React;
var Button = require('react-native-button');
var { connect } = require('react-redux/native');

class Launch extends React.Component {

  componentDidMount() {
    let Actions = this.props.routes;
    setTimeout(() => {
      Actions[this.props.user.email ? 'home' : 'login']();
    });
  }

  render() {
    var Actions = this.props.routes;
    return (
      <View style={styles.container}>
        <Image source={require('../images/loading.png')} style={styles.background} />
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
    alignItems: 'center',
  },
  background: {
    flex: 1
  }
});

function mapStateToProps(state) {
  const {
    user = {}
  } = state.rootReducer.user;

  return {
    user
  };
}

export default connect(mapStateToProps)(Launch);