import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import Firebase from 'firebase';
import { UserContext } from '../../hooks/useAuth';
import { Bubbles } from './bubbles';
import { Personal } from './personal';

export const UserDashboard = () => {
  const user: Firebase.User | null = useContext(UserContext);

  if (user) {
    return (
      <div className='page-card-no-border w-5/6 max-w-2xl'>
        <Personal
          name={user.displayName as string}
          email={user.email as string}
        />
        <Bubbles user={user} />
      </div>
    );
  } else {
    return <Redirect to='/login' />;
  }
};
