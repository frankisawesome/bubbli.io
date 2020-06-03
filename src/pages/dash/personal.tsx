import React from 'react';

interface PersonalDetail {
  photoUrl?: string;
  name: string;
  email: string;
}

export const Personal = (props: PersonalDetail) => {
  return (
    <div className='flex'>
      <div className='w-24 h-24 rounded-full bg-gray-600 mt-6'></div>
      <div className='flex flex-col justify-center ml-4'>
        <h1 className='font-semibold text-xl'>Hello, {props.name}</h1>
        <h2>{props.email}</h2>
      </div>
    </div>
  );
};
