'use strict';

var React = require('react-native');
var {TextInput, TouchableHighlight, View, Text, StyleSheet, Image, CameraRoll} = React;
var Button = require('react-native-button');
var {Actions} = require('react-native-redux-router');

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '', description: '' };
  }

  create() {
    //TODO: post boring
    console.log('Create')
  }

  getPhotos() {
    console.log('get')
    CameraRoll.getPhotos({first: 25}, this.storeImages, this.logImageError);
  }

  storeImages(data) {
    const assets = data.edges;
    const images = assets.map((asset) => asset.node.image);
    this.setState({
      images: images,
    });
  }

  logImageError(err) {
    console.log(err);
  }

  renderFirst() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
           style={styles.photoContainer}
           onPress={() => this.getPhotos()}>
          <Image
             style={styles.photo}
             source={{uri: 'http://www.sarnies.net/_wp_generated/wpb7fe3174.png'}}
             />
        </TouchableHighlight>
        <TextInput
           style={styles.title}
           onChangeText={(text) => this.setState({text})}
          placeholder="Title"
          value={this.state.text}
          />
          <TextInput
             placeholder="Description"
             value={this.state.description}
             multiline={true}
             style={styles.description}
             onChangeText={(description) => this.setState({description})}
            />
            <View style={styles.buttonContainer}>
              <Button style={styles.button} onPress={() => this.create()}>Create</Button>
            </View>
      </View>
    );
  }

  render() {
    return this.renderFirst();
  };

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  photoContainer: {
    flex: 3
  },
  photo: {
    flex: 1,
    height: null,
    width: null
  },
  logo: {
    borderWidth: 1,
    borderColor: 'pink',
    flex: 5,
    alignItems: 'stretch'
  },
  title: {
    height: 40,
    borderColor: 'gray',
    flex: 1,
    borderWidth: 1
  },
  description: {
    borderTopWidth: 0,
    height: 140,
    borderColor: 'gray',
    flex: 3,
    borderWidth: 1
  },
  buttonContainer: {
  },
  button: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'black'
  },
});

module.exports = Create;
