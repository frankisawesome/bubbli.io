import React, { FC } from 'react';
import { Bubble } from '../dash/bubbles';

export const BubbleView: FC<{ bubble: Bubble }> = ({ bubble }) => {
  return (
    <>
      {bubble.type === 'link' && (
        <div className='w-full items-center flex flex-col text-center'>
          <a
            className='bubble-lg max-w-lg w-5/6 my-4 shadow-lg overflow-hidden'
            href={bubble.url}
          >
            <h1>{bubble.title}</h1>
          </a>
        </div>
      )}
      {bubble.type === 'paragraph' && (
        <div className='w-full items-center flex flex-col text-center'>
          <div className='bubble-lg max-w-lg w-5/6 my-4 shadow-lg overflow-hidden'>
            <h1 className='font-bold text-gray-600'>{bubble.title}</h1>
            <p className='text-sm'>{bubble.text}</p>
          </div>
        </div>
      )}
    </>
  );
};
