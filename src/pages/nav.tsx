import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../firebase/Firebase';

export const Nav: FC<{ user: firebase.User | null }> = ({ user }) => {
  const firebase = useContext(FirebaseContext);
  return (
    <nav className='flex justify-between'>
      <Link to='/'>Home</Link>
      <p>
        you are {user ? `logged in as ${user.displayName}` : 'not logged in'}
      </p>
      {user ? (
        <button onClick={() => firebase.logout()}>log out</button>
      ) : (
        <Link to='/login'>Log In</Link>
      )}
    </nav>
  );
};
