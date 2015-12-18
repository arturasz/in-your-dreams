'use strict';

var React = require('react-native');
var {TextInput, TouchableHighlight, View, Text, StyleSheet, Image, CameraRoll} = React;
var Button = require('react-native-button');
var {Actions} = require('react-native-redux-router');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '',
                   description: '',
                   dream: null
                 };
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
          console.warn('error', arguments);
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
          {function(){
            if (!this.state.dream) {
              return <Image style={{flex: 1, position: 'absolute',resizeMode:'stretch', width:null, height: null, top:50, bottom: 50, left:50, right:50, }} source={require('../images/upload.png')}></Image>
            }
            return <Image
                   style={styles.photo}
                   source={this.state.dream} />
          }.call(this)}
        </TouchableHighlight>
        <View style={styles.textPlaceholder}>
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
        </View>
        <View style={styles.buttonContainer}>
          {function(){
            if (!this.state.text || !this.state.description) {
              return  <Button style={styles.buttonDisabled} onPress={() => this.create()}>Create</Button>
            }
            return  <Button style={styles.button} onPress={() => this.create()}>Create</Button>
          }.call(this)}
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
  },
  photoContainer: {
    backgroundColor: '#282828',
    flex: 6,
  },
  photo: {
    flex: 1,
    height: null,
    width: null
  },
  textPlaceholder: {
    margin: 10,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 30,
    padding: 20,
    flex: 3
  },
  title: {
    fontSize: 18,
    opacity: 0.8,
    fontWeight: 'bold',
    flex: 1,
  },
  description: {
    fontSize: 16,
    opacity: 0.8,
    lineHeight: 24,
    flex: 3,
  },
  buttonContainer: {
    justifyContent: 'center',
    padding: 20,
    flex: 1,
  },
  buttonDisabled: {
    borderRadius: 20,
    padding: 10,
    color: 'white',
    flex: 1,
    backgroundColor: '#dddddd',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    color: 'white',
    flex: 1,
    backgroundColor: '#3591df',
  },
});

module.exports = Create;
