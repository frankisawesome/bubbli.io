import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../firebase/Firebase';
import { UserContext } from '../hooks/useAuth';

export const Nav: FC<{ show: boolean }> = ({ show }) => {
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);
  return (
    <nav className={`flex justify-between ${!show && 'hidden'}`}>
      <Link to='/'>Home</Link>
      <p>
        you are {user ? `logged in as ${user.displayName}` : 'not logged in'}
      </p>
      {user ? (
        <>
          <Link to='/admin'>Admin</Link>
          <button onClick={() => firebase.logout()}>log out</button>
        </>
      ) : (
        <Link to='/login'>Log In</Link>
      )}
    </nav>
  );
};
