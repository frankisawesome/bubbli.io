import React, { FC, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FirebaseContext } from '../firebase/Firebase';
import { UserContext } from '../hooks/useAuth';

export const Nav: FC<{ show: boolean }> = ({ show }) => {
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const location = useLocation();
  return (
    <nav className={`${show ? 'nav' : 'hidden'}`}>
      <div className='flex items-center w-full lg:normal-max-w space-x-10 justify-between'>
        <div className='hidden lg:box'>
          <Link to='/' className='nav-btn'>
            home
          </Link>
          <Link to='/about' className='nav-btn'>
            about
          </Link>
        </div>
        <div className='lg:box flex items-center space-x-4'>
          <span className='rounded-full border px-4 py-2 text-gray-600 bg-white text-xl'>
            <a href='/'>b.</a>
          </span>
          <p className='hidden lg:block text-white text-xl font-semibold'>
            {location.pathname === '/admin' && 'Manage Bubbles'}
            {location.pathname === '/settings' && 'Change Settings'}
          </p>
        </div>
        {user ? (
          <div className='hidden lg:box'>
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
          <div className='hidden lg:box'>
            <Link className='nav-btn' to='/login'>
              log in
            </Link>
          </div>
        )}
        <p className='text-white text-xl font-semibold lg:hidden'>
          {location.pathname === '/admin' && 'Manage Bubbles'}
          {location.pathname === '/settings' && 'Change Settings'}
          {location.pathname === '/' && 'bubbli.io'}
        </p>
        <div className='pr-8 lg:hidden'>
          <Link to='/menu'>
            <div className='hamburger'>
              <div className='line'></div>
              <div className='line'></div>
              <div className='line'></div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};
