import React, { createContext, FC } from 'react';
import * as app from 'firebase/app';

export const FirebaseContext = createContext(null);

export const FirebaseContextProvider: FC = ({ children }) => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDifMRtJTzgAZl2qyHbIr-WyXk0eL1GyXo',
    authDomain: 'lima-terra.firebaseapp.com',
    databaseURL: 'https://lima-terra.firebaseio.com',
    projectId: 'lima-terra',
    storageBucket: 'lima-terra.appspot.com',
    messagingSenderId: '1028111541526',
    appId: '1:1028111541526:web:3e587474e2eeccb5c39c37',
    measurementId: 'G-DHM4LP923P',
  };

  app.initializeApp(firebaseConfig);

  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};
