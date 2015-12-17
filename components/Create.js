'use strict';

var React = require('react-native');
var {TextInput, TouchableHighlight, View, Text, StyleSheet, Image, CameraRoll} = React;
var Button = require('react-native-button');
var {Actions} = require('react-native-redux-router');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '', description: '', dream: {
      uri: 'http://www.sarnies.net/_wp_generated/wpb7fe3174.png'
    }};
  }

  create() {
    if (this.state.text.length > 0 && this.state.description.length > 0) {
      fetch('https://in-your-dreams.herokuapp.com/api/idea', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: JSON.stringify(this.state.dream),
          description: this.state.description,
          title: this.state.text,
          user: 'Hardcoded'
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.debug('Received', responseJson)
          this.props.routes.home();
        })
        .catch((error) => {
          console.log(arguments);
        });
      console.log('Create')
    }
    //TODO: post boring
  }

  getPhotos() {
    var options = {
      title: 'Select Your Dream', // specify null or empty string to remove the title
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
      chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.2,
      allowsEditing: false, // Built in iOS functionality to resize/reposition the image
      noData: false, // Disables the base64 `data` field from being generated (greatly improves performance on large photos)
      storageOptions: { // if this key is provided, the image will get saved in the documents directory (rather than a temporary directory)
        skipBackup: true, // image will NOT be backed up to icloud
        path: 'images' // will save image at /Documents/images rather than the root
      }
    };

    /** 
     * The first arg will be the options object for customization, the second is
     * your callback which sends bool: didCancel, object: response.
     *
     * response.data is the base64 encoded image data
     * response.uri is the uri to the local file asset on the device
     * response.isVertical will be true if the image is vertically oriented
     * response.width & response.height give you the image dimensions
     */

    UIImagePickerManager.showImagePicker(options, (didCancel, response) => {
      console.log('Response = ', response);

      if (didCancel) {
        console.log('User cancelled image picker');
      }
      else {
        if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          // You can display the image using either:
          const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

          this.setState({
            dream: source
          });
        }
      }
    });
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
             source={this.state.dream} />
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
