import React, { FC, useContext, useState } from 'react';
import { useAuth, UserContext } from './hooks/useAuth';
import { Nav } from './pages/nav';
import { LoginRegisterForm } from './pages/auth/auth';
import { Home } from './pages/home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FirebaseContext, Firebase } from './firebase/Firebase';
import { UserDashboard } from './pages/dash/dash';
import { Bio } from './pages/bio/bio';

export const App: FC = () => {
  const firebase: Firebase = useContext(FirebaseContext);
  const user: firebase.User | null = useAuth(firebase);
  const [showNav, setShowNav] = useState(true);
  return (
    <UserContext.Provider value={user}>
      <Router>
        <div className='flex justify-start flex-col items-center h-full'>
          <Nav show={showNav}></Nav>
          <Switch>
            <Route exact path='/' component={() => <Home />} />
            <Route path='/login' component={LoginRegisterForm} />
            <Route path='/admin' component={UserDashboard} />
            <Route
              path='/:name'
              render={(props) => <Bio {...props} toggleNav={setShowNav} />}
            />
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
};
