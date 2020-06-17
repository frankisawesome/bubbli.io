import React from 'react';
import { Link } from 'react-router-dom';

interface PersonalDetail {
  photoUrl?: string;
  name: string;
  email: string;
}

export const Personal = (props: PersonalDetail) => {
  return (
    <div className='flex py-4 items-center'>
      <div className='w-24 h-24 rounded-full bg-gray-600 mx-6'></div>
      <div className='flex flex-col justify-center mx-6 '>
        <h1 className='font-semibold text-xl'>Hello, {props.name}</h1>
        <a href='https://bubbli.io/frank'>bubbli.io/{props.name}</a>
        <Link className='text-gray-700' to='/settings'>
          {props.photoUrl ? 'change avatar' : 'set avatar'}
        </Link>
      </div>
    </div>
  );
};
