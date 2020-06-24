import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Firebase from 'firebase';
import { UserContext } from '../../hooks/useAuth';
import { Bubbles } from './bubbles';
import { Personal } from './personal';

export const UserDashboard = () => {
  const user: Firebase.User | null = useContext(UserContext);
  //no idea why user.displayName is null righ after registration
  const [useless, setUseless] = useState(false);

  useEffect(() => {
    if (user?.displayName) {
      setUseless(true);
    } else
      setTimeout(() => {
        setUseless(true);
      }, 1000);
  });

  if (user && useless) {
    return (
      <div className='page-card-no-border w-5/6 max-w-2xl'>
        <Personal name={user.displayName as string} />
        <Bubbles user={user} />
      </div>
    );
  } else if (user) {
    return <div>Loading User Details</div>;
  } else {
    return <Redirect to='/login' />;
  }
};
