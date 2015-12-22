var React = require('react-native');
var {View, StyleSheet, PropTypes, Image, ActivityIndicatorIOS, Text} = React;
import { connect } from 'react-redux/native';
import { fetchMyDreams } from '../actions/my-dreams-actions.js';
import DreamList from './DreamList.js';
import URI from 'urijs'

class MyDreams extends React.Component {

  componentDidMount() {
    this.props.fetchMyDreams();
  }

  renderLoader() {
    return (
      <View style={styles.loaderContainer}>
        <Image source={require('../images/background-dream-list.png')} style={styles.loaderCentering}>
          <View style={styles.loaderCircle}>
            <ActivityIndicatorIOS
              animating={this.props.loading}
              style={styles.loader}
              size="large"
            />
          </View>
        </Image>
      </View>
    );
  }

  render() {
    if (this.props.loading) {
      return this.renderLoader();
    }
    let profile = this.props.profile;
    return (
      <View style={{flex: 1}}>
        <Image source={require('../images/background-profile.png')} style={styles.profileContainer}>
          <View style={styles.profileImageWrapper}>
            <Image style={styles.profileImage} source={{uri: URI(profile.image.url).query({sz: 100}).toString()}} />
          </View>
          <Text style={styles.profileEmail} numberOfLines={1}>{ profile.emails[0].value }</Text>
          <View style={styles.statisticsContainer}>
            <View style={styles.statistics}>
              <Text style={styles.statisticsNumber}>{this.props.dreamList.length}</Text>
              <Text style={styles.statisticsDescription}>Dreams</Text>
            </View>
            <View style={styles.statistics}>
              <Text style={styles.statisticsNumber}>{this.props.statistics.upVotes}</Text>
              <Text style={styles.statisticsDescription}>Awesome</Text>
            </View>
            <View style={styles.statistics}>
              <Text style={styles.statisticsNumber}>{this.props.statistics.downVotes}</Text>
              <Text style={styles.statisticsDescription}>Boring</Text>
            </View>
          </View>
        </Image>
        <DreamList style={{flex: 1}} loading={this.props.loading} dreamList={this.props.dreamList} />
      </View>
    );
  }
}

MyDreams.propTypes = {
  loading: PropTypes.bool.isRequired,
  dreamList: PropTypes.array.isRequired,
  dispatch: PropTypes.func
};

var styles = StyleSheet.create({
  loaderContainer: {
    flex: 1
  },
  loaderCentering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderCircle: {
    width: 65,
    height: 65,
    backgroundColor: '#ffffff',
    borderRadius: 33,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 30
  },
  loader: {
    top: 16,
    left: 17,
    width: 35,
    height: 35
  },
  profileContainer: {
    alignItems: 'center',
    height: 250
  },
  profileImageWrapper: {
    marginTop: 25,
    borderRadius: 55,
    borderWidth: 5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: "#000000",
    shadowOpacity: 0.21,
    shadowRadius: 20
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileEmail: {
    marginTop: 15,
    color: '#ffffff',
    fontFamily: 'Helvetica Neue',
    fontSize: 18
  },
  statisticsContainer: {
    flexDirection: 'row',
  },
  statistics: {
    marginTop: 15,
    paddingLeft: 25,
    paddingRight: 25,
  },
  statisticsNumber: {
    alignSelf: 'center',
    color: '#ffffff',
    fontFamily: 'Helvetica Neue',
    fontSize: 16
  },
  statisticsDescription: {
    color: '#ffffff',
    fontFamily: 'Helvetica Neue',
    fontSize: 14
  }

});

function mapStateToProps(state) {
  const { user = {} } = state.rootReducer;
  const { profile = {} } = state.rootReducer;
  const {
    loading = false,
    dreamList = [],
    statistics = {
      upVotes: 0,
      downVotes: 0
    }
    } = state.rootReducer.myDreams;

  return {
    user,
    profile,
    loading,
    dreamList,
    statistics
  };
}

export default connect(mapStateToProps, {fetchMyDreams})(MyDreams);
