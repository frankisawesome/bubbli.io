import React, { FC, useContext } from 'react';
import { UserContext } from '../hooks/useAuth';

export const Home: FC = () => {
  const user = useContext(UserContext);
  return user ? (
    <div>{JSON.stringify(user)}</div>
  ) : (
    <div>Welcome, please log in</div>
  );
};
