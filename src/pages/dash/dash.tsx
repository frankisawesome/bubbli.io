import React, { useContext, useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router';
import Firebase from 'firebase';
import { UserContext } from '../../hooks/useAuth';
import { Bubbles } from './bubbles';
import { Personal } from './personal';

export const UserDashboard = () => {
  const user: Firebase.User | null = useContext(UserContext);
  //no idea why user.displayName is null righ after registration
  const [hasName, setHasName] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (user?.displayName) {
      setHasName(true);
    } else {
      setTimeout(() => {
        if (user) {
          setHasName(true);
        } else {
          history.push('/login');
        }
      }, 1000);
    }
  }, [user]);

  if (user && hasName) {
    return (
      <div className='page-card-no-border w-5/6 max-w-2xl'>
        <Personal name={user.displayName as string} />
        <Bubbles user={user} />
      </div>
    );
  } else if (user) {
    return (
      <div className='text-center py-2 text-gray-600 font-semibold'>
        loading user data...
      </div>
    );
  } else {
    return (
      <div className='text-center py-2 text-gray-600 font-semibold'>
        loading user data...
      </div>
    );
  }
};
