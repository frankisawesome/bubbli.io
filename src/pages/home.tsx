import React, { FC, useContext } from 'react';
import Firebase from 'firebase';

export const Home: FC<{ user: Firebase.User | null }> = ({ user }) => {
  return user ? (
    <div>{JSON.stringify(user)}</div>
  ) : (
    <div>Welcome, please log in</div>
  );
};
