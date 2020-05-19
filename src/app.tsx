import React, { FC, useContext } from 'react';
import { useAuth, UserContext } from './hooks/useAuth';
import { Nav } from './pages/nav';
import { LoginRegisterForm } from './pages/auth/auth';
import { Home } from './pages/home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FirebaseContext, Firebase } from './firebase/Firebase';
import { UserDashboard } from './pages/dash/dash';

export const App: FC = () => {
  const firebase: Firebase = useContext(FirebaseContext);
  const user: firebase.User | null = useAuth(firebase);
  return (
    <UserContext.Provider value={user}>
      <Router>
        <Nav></Nav>
        <Switch>
          <Route exact path='/' component={() => <Home />} />
          <Route path='/login' component={LoginRegisterForm} />
          <Route path='/admin' component={UserDashboard} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};
