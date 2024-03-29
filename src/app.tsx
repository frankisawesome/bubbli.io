import React, { FC, useContext, useState, useEffect } from 'react';
import { useAuth, UserContext } from './hooks/useAuth';
import { Nav } from './pages/nav';
import { LoginRegisterForm } from './pages/auth/auth';
import { Home } from './pages/home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FirebaseContext, Firebase } from './firebase/Firebase';
import { UserDashboard } from './pages/dash/dash';
import { Bio } from './pages/bio/bio';
import { Forgot } from './pages/forgot';
import { Settings } from './pages/dash/settings';
import { About } from './pages/about';
import { Footer } from './pages/footer';
import { Menu } from './pages/menu';
import 'react-tippy/dist/tippy.css';

export const App: FC = () => {
  const firebase: Firebase = useContext(FirebaseContext);
  const user: firebase.User | null = useAuth(firebase);
  const [showNav, setShowNav] = useState(true);

  return (
    <UserContext.Provider value={user}>
      <Router>
        <div className='flex justify-between flex-col items-center min-h-screen max-w-full'>
          <div className='flex flex-col justify-start items-center w-full'>
            <Nav show={showNav}></Nav>
            <Switch>
              <Route exact path='/' component={() => <Home />} />
              <Route path='/login' component={LoginRegisterForm} />
              <Route path='/admin' component={UserDashboard} />
              <Route path='/forgot' component={Forgot} />
              <Route path='/settings' component={Settings} />
              <Route path='/about' component={About} />
              <Route
                path='/menu'
                render={(props) => <Menu {...props} toggleNav={setShowNav} />}
              />
              <Route
                path='/:name'
                render={(props) => <Bio {...props} toggleNav={setShowNav} />}
              />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </UserContext.Provider>
  );
};
