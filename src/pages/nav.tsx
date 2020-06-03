import React, { FC, useContext } from 'react';
import { Link, RouteComponentProps, useLocation } from 'react-router-dom';
import { FirebaseContext } from '../firebase/Firebase';
import { UserContext } from '../hooks/useAuth';

export const Nav: FC<{ show: boolean }> = ({ show }) => {
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const location = useLocation();
  return (
    <nav className={`${show ? 'nav' : 'hidden'} w-full lg:normal-max-w`}>
      <Link to='/' className='nav-btn'>
        home
      </Link>
      <Link to='/about' className='nav-btn'>
        {location.pathname === '/' ? 'about' : 'bubbli.io'}
      </Link>
      {user ? (
        <>
          {location.pathname === '/admin' ? (
            <Link className='nav-btn' to='/settings'>
              settings
            </Link>
          ) : (
            <Link className='nav-btn' to='/admin'>
              admin
            </Link>
          )}
          <button className='nav-btn' onClick={() => firebase.logout()}>
            log out
          </button>
        </>
      ) : (
        <Link className='nav-btn' to='/login'>
          Log In
        </Link>
      )}
    </nav>
  );
};
