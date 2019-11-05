import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import Routes from './components/Routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import firebase from './fb';

class App extends Component {
  state = {
    loggedIn: null
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({loggedIn: true})
      }else{
        this.setState({loggedIn: false})
      }
    })
  }

  render() {
    const state = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={state}>
        <StatusBar barStyle="light-content" translucent={true} />
        <Routes />
      </Provider>
    );
  }
}

export default App;
