import React, { FC, useState, useEffect } from 'react';
import { Bubble } from './bubbles';
import { BubbleView } from '../bio/bubbleView';

export const BubbleEdit: FC<{
  bubble: Bubble;
  index: number;
  handleDelete: (i: number) => void;
  handleChange: (i: number, newEl: Bubble) => void;
  handleBlur: () => void;
  setModal: (i: number) => void;
  modal: number;
}> = ({
  bubble,
  index,
  handleDelete,
  handleChange,
  handleBlur,
  setModal,
  modal,
}) => {
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (!bubble.title && !bubble.url) {
      setDisabled(false);
    }
  }, []);

  useEffect(() => {
    if (!disabled) {
      setModal(index);
    } else {
      setModal(-1);
    }
  }, [disabled]);

  function handleEdit() {
    setDisabled((prev) => !prev);
  }

  function deleteAndReset() {
    handleDelete(index);
    setModal(-1);
  }
  return (
    <div
      className={`flex bubble my-2 justify-center w-full ${
        index === modal && 'modal sm:modal-lg'
      }
      ${index !== modal && modal !== -1 && 'opacity-25'}
      `}
    >
      {disabled ? (
        <div className='w-full flex justify-center items-center'>
          <h1 className='text-2xl'>{bubble.title}</h1>
        </div>
      ) : (
        <div className='w-full flex flex-col items-center'>
          <h1 className='text-xl my-2 font-semibold'>Edit Your Bubble</h1>
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
                handleChange(index, {
                  url: e.target.value,
                  title: bubble.title,
                })
              }
              onBlur={handleBlur}
            ></input>
          </div>
        </div>
      )}

      <div
        className={`${
          disabled ? 'flex' : 'flex flex-col justify-center'
        } border-left px-1`}
      >
        <button className='btn-alt my-2' onClick={() => handleEdit()}>
          {disabled ? 'Edit' : 'Back'}
        </button>
        <button className='btn-alt-del my-2' onClick={() => deleteAndReset()}>
          Delete
        </button>
      </div>
    </div>
  );
};
