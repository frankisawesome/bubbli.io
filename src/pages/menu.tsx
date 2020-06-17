import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

export const Menu = (props: any) => {
  useEffect(() => {
    props.toggleNav(false);
    return () => props.toggleNav(true);
  }, []);
  const goBack = useHistory().goBack;
  return (
    <div className='h-screen w-screen bg-gray-600'>
      <div className='flex justify-end'>
        <button onClick={goBack} className='close'></button>
      </div>
      <div className='flex flex-col items-center space-y-10 pt-10'>
        <Link className='menu-btn' to='/'>
          home
        </Link>
        <Link className='menu-btn' to='/about'>
          about
        </Link>
        <Link className='menu-btn' to='/admin'>
          admin
        </Link>
        <Link className='menu-btn' to='/login'>
          login
        </Link>
      </div>
    </div>
  );
};
