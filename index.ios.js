'use strict';

var React = require('react-native');
var {AppRegistry, StyleSheet,Text,View, Navigator} = React;
var Launch = require('./components/Launch');
var Register = require('./components/Register');
var Login = require('./components/Login');
var {Router, routerReducer, Route, Container, Animations, Schema} = require('react-native-redux-router');
var {NavBar, NavBarSecondary, NavBarModal} = require('./components/NavBar');
var Error = require('./components/Error');
var Home = require('./components/Home');
var Create = require('./components/Create');
var Menu = require('./components/Menu');
var MyDreams = require('./components/MyDreams');
var NoDreams = require('./components/NoDreams');
var LeaderBoard = require('./components/LeaderBoard');
var ItsAMatch = require('./components/ItsAMatch');

var { NativeAppEventEmitter } = require('react-native');
var GoogleSignin = require('react-native-google-signin');
var thunk = require('redux-thunk');

GoogleSignin.configure(
  '772751197366-soir68t1hi7r30hp5bea1p4ta47mo8f5.apps.googleusercontent.com', // from .plist file
  ['https://www.googleapis.com/auth/plus.login', 'email'] // array of authorization names: eg ['https://www.googleapis.com/auth/calendar'] for requesting access to user calendar
);

import { Provider } from 'react-redux/native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as LoginActions from './actions/login-actions';
import * as OnboardingActions from './actions/onboarding-actions';
import rootReducer from './reducers'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(combineReducers({rootReducer, routerReducer}));

NativeAppEventEmitter.addListener('googleSignIn', (user) => {
    store.dispatch(LoginActions.userLoggedIn(user));
    store.dispatch(LoginActions.fetchUserProfile(user)).then(() => {
      store.dispatch(LoginActions.saveUserProfile())
    });
    store.dispatch(OnboardingActions.saveOnboarding());
    store.dispatch({
        type: 'REPLACE',
        name: 'home'
    });
});

NativeAppEventEmitter.addListener('googleSignInError', (error) => {
  console.log('googleSignInError', error);
});

class App extends React.Component {

    render(){
        return (
            <View style={{flex:1}}>
                <Router>
                    <Schema name="modal" sceneConfig={Animations.FlatFloatFromBottom} navBar={NavBarModal}/>
                    <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromLeft} navBar={NavBar}/>
                    <Schema name="secondary" sceneConfig={Navigator.SceneConfigs.FloatFromRight} navBar={NavBarSecondary}/>
                    <Schema name="withoutAnimation" navBar={NavBar}/>
                    <Schema name="tab" navBar={NavBar}/>

                    <Route name="launch"  component={Launch} initial={true} hideNavBar={true} title="Launch"/>
                    <Route name="myDreams" component={MyDreams} title="My Dreams" schema="secondary"/>
                    <Route name="noDreams" component={NoDreams} tyoe="replace" title="In Your Dreams"/>
                    <Route name="leaderBoard" component={LeaderBoard} title="Top Rated Dreams" schema="secondary"/>
                    <Route name="home" component={Home} title="Wix Dreams" type="replace"/>
                    <Route name="create" component={Create} title="Create" schema="secondary"/>
                    <Route name="login" component={Login} hideNavBar={true} title="Launch" type="replace" />
                    <Route name="menu" component={Menu} hideNavBar={true} />
                    <Route name="itsAMatch" component={ItsAMatch} hideNavBar={true} />
                    <Route name="error" component={Error} schema="popup"/>
                </Router>
            </View>
        );
    }
}

class Example extends React.Component {
    render() {
        return (
            <Provider store={store}>
                {() => <App />}
            </Provider>
        );
    }
}

AppRegistry.registerComponent('Example', () => Example);
