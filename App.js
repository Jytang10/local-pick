import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import Routes from './components/Routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

class App extends Component {
  
  render() {
    console.disableYellowBox = true;

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
