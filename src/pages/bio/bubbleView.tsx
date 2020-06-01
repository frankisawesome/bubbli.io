import React, { FC } from 'react';
import { Bubble } from '../dash/bubbles';

export const BubbleView: FC<{ bubble: Bubble }> = ({ bubble }) => {
  return (
    <div className='w-full items-center flex flex-col text-center'>
      <a className='bubble-lg max-w-lg w-5/6 my-4' href={bubble.url}>
        <h1>{bubble.title}</h1>
      </a>
    </div>
  );
};
