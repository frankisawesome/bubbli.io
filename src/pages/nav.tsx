import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../firebase/Firebase';
import { UserContext } from '../hooks/useAuth';

export const Nav: FC<{ show: boolean }> = ({ show }) => {
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);
  return (
    <nav className={`nav ${!show && 'hidden'} w-full lg:normal-max-w`}>
      <Link to='/' className='nav-btn'>
        Home
      </Link>
      <h1 className='nav-btn'>Bubbli.io</h1>
      {user ? (
        <>
          <Link className='nav-btn' to='/admin'>
            Admin
          </Link>
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
