import React, { useContext } from 'react';
import { Redirect } from 'react-router';

import Firebase from 'firebase';
import { UserContext } from '../../hooks/useAuth';
import { Bubbles } from './bubbles';

export const UserDashboard = () => {
  const user: Firebase.User | null = useContext(UserContext);
  if (user) {
    return (
      <div>
        <h1>Welcom to your dashboard, {user.displayName}</h1>
        <p>Your email is: {user.email}</p>
        {user.photoURL ? (
          <p>
            Your profile photo is: <img src={user.photoURL}></img>
          </p>
        ) : (
          <p>You haven't set a profile photo yet :(</p>
        )}
        <h1>Create some elements in your bio!</h1>
        <Bubbles user={user} />
      </div>
    );
  } else {
    return <Redirect to='/login' />;
  }
};
