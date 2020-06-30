import React from 'react';
import { Link } from 'react-router-dom';
import { usePhoto } from '../../hooks/usePhoto';

interface PersonalDetail {
  photoUrl?: string;
  name: string;
}

export const Personal = (props: PersonalDetail) => {
  const link = `bubbli.io/${props.name}`;
  const [photoUrl] = usePhoto();
  return (
    <div className='flex py-4 items-center'>
      {photoUrl ? (
        <img className='w-24 h-24 object-top rounded-full' src={photoUrl}></img>
      ) : (
        <div className='w-24 h-24 rounded-full bg-gray-600 mx-6'></div>
      )}

      <div className='flex flex-col justify-center mx-6 '>
        <h1 className='font-semibold text-xl'>Hello, {props.name}</h1>
        <a href={`/${props.name}`}>{link}</a>
        <Link className='text-gray-700' to='/settings'>
          {props.photoUrl ? 'change avatar' : 'set avatar'}
        </Link>
      </div>
    </div>
  );
};
