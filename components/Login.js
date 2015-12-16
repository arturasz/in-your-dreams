'use strict';

var React = require('react-native');
var {View, Text, StyleSheet} = React;
var Button = require('react-native-button');

var { NativeAppEventEmitter } = require('react-native');
var GoogleSignin = require('react-native-google-signin');

GoogleSignin.configure(
  '772751197366-soir68t1hi7r30hp5bea1p4ta47mo8f5.apps.googleusercontent.com', // from .plist file
  ['https://www.googleapis.com/auth/plus.login', 'email'] // array of authorization names: eg ['https://www.googleapis.com/auth/calendar'] for requesting access to user calendar
);

NativeAppEventEmitter.addListener('googleSignIn', (user) => {
    console.log('User', user)
});

class Login extends React.Component {
    render(){
        let Actions = this.props.routes;
        let SignIn = () => {
            GoogleSignin.signIn();
        };

        return (
            <View style={styles.container}>
                <Text>Login page: {this.props.data}</Text>
                <Button onPress={SignIn}>Sign In</Button>
                <Button onPress={Actions.pop}>Back</Button>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

module.exports = Login;
