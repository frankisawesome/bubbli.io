import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Firebase from 'firebase';
import { UserContext } from '../../hooks/useAuth';
import { Bubbles } from './bubbles';

export const UserDashboard = () => {
  const user: Firebase.User | null = useContext(UserContext);

  if (user) {
    return (
      <div className='page-card-no-border md:page-card w-5/6 max-w-2xl'>
        <h1 className='font-semibold text-3xl'>
          Greetings, {user.displayName}
        </h1>
        <p className='my-4 text-xl'>Manage your bubbles</p>
        <Bubbles user={user} />
      </div>
    );
  } else {
    return <Redirect to='/login' />;
  }
};
