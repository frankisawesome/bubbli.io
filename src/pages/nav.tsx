import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface NavProps {
  logged: boolean;
}

export const Nav: FC<NavProps> = (props: NavProps) => {
  return (
    <nav className='flex justify-between'>
      <Link to='/'>Home</Link>
      <Link to='/login'>Log In</Link>
      <p>you are {props.logged ? 'logged in' : 'not logged in'}</p>
    </nav>
  );
};
