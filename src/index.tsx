import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { App } from './app';
import { Firebase, FirebaseContext } from './firebase/Firebase';

const firebase = Firebase.initialiseWithLocalConfig();
ReactDOM.render(
  <FirebaseContext.Provider value={firebase}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
