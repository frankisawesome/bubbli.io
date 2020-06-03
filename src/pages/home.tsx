import React, { FC } from 'react';
import bioImg from '../images/bio.png';

export const Home: FC = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-6xl my-2 text-gray-600'>bubbli.io</h1>
      <h1 className='text-center font-semibold text-4xl my-4'>
        your personal online <span className='text-gray-600'>bio</span>
      </h1>
      <div>
        <img src={bioImg} className='max-h-half bubble mt-4' />
      </div>
    </div>
  );
};
