'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, PropTypes, Image, ListView, ActivityIndicatorIOS} = React;
import Loader from './Loader.js';

class DreamList extends React.Component {
  componentWillMount() {
    this.props.fetchDreamList();
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

  renderDream(dream, sectionID, idx, highlightRow) {
    return (
      <View>
        <View style={styles.dreamContainer}>
          <Image style={styles.dreamThumbnail} source={dream.idea.image}/>
          <View style={styles.dreamPositionContainer}>
            <Text style={styles.dreamPosition}>{parseInt(idx) + 1}</Text>
          </View>
          <View style={styles.dreamInfoContainer}>
            <Text style={styles.dreamTitle}>{dream.idea.title}</Text>
            <Text style={styles.dreamDescription} numberOfLines={1}>{dream.idea.description}</Text>
          </View>
        </View>
        <View style={styles.dreamSeparator}/>
      </View>
    );
  }

  renderDreamList() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(this.props.dreamList);

    return (
      <View style={{flex: 1}}>
        <ListView
          dataSource={dataSource}
          renderRow={this.renderDream}
        />
      </View>
    );
  }

  render() {
    return this.props.loading ? this.renderLoader() : this.renderDreamList();
  }
}

DreamList.propTypes = {
  fetchDreamList: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  dreamList: PropTypes.array.isRequired,
  dataSource: PropTypes.object.isRequired,
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
  dreamContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'transparent',
  },
  dreamThumbnail: {
    borderRadius: 25,
    width: 50,
    height: 50,
    overflow: 'hidden'
  },
  dreamPositionContainer: {
    position: 'absolute',
    borderRadius: 10,
    backgroundColor: '#3899ec',
    width: 20,
    height: 20,
    left: 15,
    bottom: 15,
    overflow: 'hidden'
  },
  dreamPosition: {
    textAlign: 'center',
    color: '#ffffff',
    lineHeight: 16,
    fontFamily: 'Helvetica Neue',
    fontSize: 11
  },
  dreamInfoContainer: {
    flex: 1,
    paddingLeft: 15
  },
  dreamTitle: {
    paddingTop: 7,
    color: '#000000',
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
  },
  dreamDescription: {
    paddingTop: 7,
    color: '#909090',
    fontFamily: 'Helvetica Neue',
    fontSize: 12
  },
  dreamSeparator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  }
});

export default DreamList;
