import React, { FC, useContext } from 'react';
import { useAuth } from './hooks/useAuth';
import { Nav } from './pages/nav';
import { LoginRegisterForm } from './pages/auth/index';
import { Home } from './pages/home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FirebaseContext, Firebase } from './firebase/Firebase';

export const App: FC = () => {
  const firebase: Firebase = useContext(FirebaseContext);
  const user: firebase.User | null = useAuth(firebase);
  return (
    <Router>
      <Nav user={user}></Nav>
      <Switch>
        <Route exact path='/' component={() => <Home user={user} />} />
        <Route path='/login' component={LoginRegisterForm} />
      </Switch>
    </Router>
  );
};
