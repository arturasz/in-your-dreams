'use strict';

var React = require('react-native');
var {View, Text, StyleSheet} = React;
var Button = require('react-native-button');

class Login extends React.Component {
    render(){
        console.log(this.props);

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
