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

  const themeSelection = (
    <div className='w-3/4 flex justify-between'>
      <p className='self-center text-gray-600'>select theme:</p>
      <div className='w-3/4 flex justify-between my-4'>
        <div className='w-12 h-12 rounded-full bg-gray-600'></div>
        <div className='w-12 h-12 rounded-full bg-red-600'></div>
        <div className='w-12 h-12 rounded-full bg-orange-600'></div>
        <div className='w-12 h-12 rounded-full bg-white border'></div>
        <div className='w-12 h-12 rounded-full bg-teal-600'></div>
        <div className='w-12 h-12 rounded-full bg-blue-600'></div>
      </div>
    </div>
  );

  if (user && hasName) {
    return (
      <div className='page-card-no-border w-5/6 max-w-2xl'>
        <Personal name={user.displayName as string} />
        {themeSelection}
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
