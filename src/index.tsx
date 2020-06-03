import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import { Firebase, FirebaseContext } from './firebase/Firebase';

if (localStorage.getItem('dark') === 'true') {
  require('./styles/dark.css');
} else {
  require('./styles/index.css');
}

const firebase = Firebase.initialiseWithLocalConfig();
ReactDOM.render(
  <FirebaseContext.Provider value={firebase}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
