import React, { FC, useState, useEffect } from 'react';
import { Bubble } from './bubbles';

export const BubbleEdit: FC<{
  bubble: Bubble;
  index: number;
  handleDelete: (i: number) => void;
  handleChange: (i: number, newEl: Bubble) => void;
  handleBlur: () => void;
}> = ({ bubble, index, handleDelete, handleChange, handleBlur }) => {
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (!bubble.title && !bubble.url) {
      setDisabled(false);
    }
  }, []);
  return (
    <div className='flex bubble my-2 justify-center w-full'>
      <div className='w-full'>
        <div className='max-w-md w-full'>
          <label>title: </label>
          <input
            disabled={disabled}
            className={`my-2 ${
              disabled ? 'form-input-disabled' : 'form-input'
            }`}
            value={bubble.title}
            onChange={(e) =>
              handleChange(index, { url: bubble.url, title: e.target.value })
            }
            onBlur={handleBlur}
          ></input>
        </div>

        <div className='max-w-md w-full'>
          <label>link: </label>
          <input
            disabled={disabled}
            className={`my-2 ${
              disabled ? ' form-input-disabled' : 'form-input'
            }`}
            value={bubble.url}
            onChange={(e) =>
              handleChange(index, { url: e.target.value, title: bubble.title })
            }
            onBlur={handleBlur}
          ></input>
        </div>
      </div>
      <div className='flex flex-col justify-center'>
        <button
          className='btn-alt my-2'
          onClick={() => setDisabled((prev) => !prev)}
        >
          {disabled ? 'Edit' : 'Lock'}
        </button>
        <button
          className='btn-alt-del my-2'
          onClick={() => handleDelete(index)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
