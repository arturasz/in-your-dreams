'use strict';

var NavigationBar = require('react-native-navbar');
var React = require('react-native');
var {StyleSheet,View} = React;
var {Router, Route, Animations, Schema} = require('react-native-redux-router');
import MenuButton from './MenuButton.js';

class NavBarBase extends React.Component {
    onPrev(){
        var Actions = this.props.routes;
        if (this.props.onPrev){
            this.props.onPrev();
            return;
        }
        if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1){
            Actions.pop();
        }
    }
    render() {
        var Actions = this.props.routes;
        return <NavigationBar style={styles.navBar}
                              titleColor='white'
                              buttonsColor='white'
                              statusBar='lightContent'
                              prevTitle={this.props.initial ? " " : null}
                              onPrev={this.props.onPrev || Actions.pop}
                              onNext={this.props.onNext || Actions.pop}
            {...this.props}
            />
    }
}
class NavBar extends React.Component {
    render() {
        let Actions = this.props.routes;
        return (
          <NavigationBar
            backgroundStyle={styles.navigationBackground}
            style={styles.navigation}
            statusBar='default'
            titleColor='white'
            customPrev={
            <MenuButton
              style={{ marginLeft: 10, marginRight: 10, marginTop: 35 }}
              onPress={() => Actions.menu()}/>}
            {...this.props}
            />
        )
    }
}

class NavBarMenu extends React.Component {
  render() {
    let Actions = this.props.routes;
    return (
      <NavigationBar
        backgroundStyle={styles.navigationBackground}
        style={styles.navigation}
        statusBar='default'
        titleColor='white'
        customPrev={
            <MenuButton
              style={{ marginLeft: 10, marginRight: 10, marginTop: 35 }}
              onPress={() => Actions.pop()}/>}
        {...this.props}
        />
    )
  }
}


class NavBarModal extends React.Component {
    render() {
        return <NavBarBase customPrev={<View/>} nextTitle="Close" {...this.props}/>
    }
}

var styles = StyleSheet.create({
    navigationBackground: {
        borderBottomWidth: 0
    },
    navigation: {
        backgroundColor: 'rgba(50, 50, 50, 0.1)'
    },
    navBar: {
        backgroundColor: '#0db0d9'
    },
});


module.exports = {NavBar, NavBarModal};