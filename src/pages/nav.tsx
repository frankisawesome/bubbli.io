import React, { FC, useContext } from 'react';
import { Link, RouteComponentProps, useLocation } from 'react-router-dom';
import { FirebaseContext } from '../firebase/Firebase';
import { UserContext } from '../hooks/useAuth';

export const Nav: FC<{ show: boolean }> = ({ show }) => {
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const location = useLocation();
  return (
    <nav className={`${show ? 'nav' : 'hidden'}`}>
      <div className='flex items-center w-full lg:normal-max-w space-x-10 justify-between'>
        <div className='box'>
          <Link to='/' className='nav-btn'>
            home
          </Link>
          <Link to='/about' className='nav-btn'>
            about
          </Link>
        </div>
        <div className='box'>
          <span className='rounded-full border px-3 py-1 text-gray-600 bg-white text-xl'>
            <a href='/'>b.</a>
          </span>
        </div>
        {user ? (
          <div className='box'>
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
          </div>
        ) : (
          <div className='box'>
            <Link className='nav-btn' to='/login'>
              log in
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
