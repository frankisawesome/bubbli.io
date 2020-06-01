import React, { FC } from 'react';
import { Bubble } from './bubbles';

export const BubbleEdit: FC<{
  bubble: Bubble;
  index: number;
  handleDelete: (i: number) => void;
  handleChange: (i: number, newEl: Bubble) => void;
}> = ({ bubble, index, handleDelete, handleChange }) => {
  return (
    <div className='flex flex-col bubble my-2 items-center'>
      <h1 className='font-semibold self-start text-lg'>
        bubble no.{index + 1}
      </h1>
      <label className='my-2 font-bold'>
        title - this is what your visitor sees
      </label>
      <input
        className='form-input'
        value={bubble.title}
        onChange={(e) =>
          handleChange(index, { url: bubble.url, title: e.target.value })
        }
      ></input>
      <label className='my-2 font-bold'>
        url - this is where they'll be redirected to
      </label>
      <input
        className='form-input'
        value={bubble.url}
        onChange={(e) =>
          handleChange(index, { url: e.target.value, title: bubble.title })
        }
      ></input>
      <button className='btn-alt' onClick={() => handleDelete(index)}>
        Delete
      </button>
    </div>
  );
};
