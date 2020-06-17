import React, { FC, useState, useEffect } from 'react';
import { Bubble } from './bubbles';

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
    if (!disabled && bubble.title === '' && bubble.url === '') {
      setDisabled(false);
      deleteAndReset();
    }
    setDisabled((prev) => !prev);
  }

  function deleteAndReset() {
    handleDelete(index);
    setModal(-1);
  }

  const titleInput = (
    <div className='max-w-md w-full'>
      <label>title: </label>
      <input
        disabled={disabled}
        className={`my-2 ${disabled ? 'form-input-disabled' : 'form-input'}`}
        value={bubble.title}
        onChange={(e) =>
          handleChange(index, { url: bubble.url, title: e.target.value })
        }
        onBlur={handleBlur}
      ></input>
    </div>
  );

  const linkInput = (
    <div className='max-w-md w-full'>
      <label>link: </label>
      <input
        disabled={disabled}
        className={`my-2 ${disabled ? ' form-input-disabled' : 'form-input'}`}
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
  );
  return (
    <div
      className={`flex flex-col bubble my-2 justify-center w-full ${
        index === modal && 'modal sm:modal-lg'
      }
      ${index !== modal && modal !== -1 && 'opacity-25'}
      `}
    >
      <div className='flex justify-between'>
        <button className='btn-alt-del' onClick={() => deleteAndReset()}>
          Delete
        </button>
        {disabled ? (
          <h1 className='text-xl'>{bubble.title}</h1>
        ) : (
          <h1 className='text-xl font-semibold'>Edit</h1>
        )}
        <button className='btn-alt' onClick={() => handleEdit()}>
          {disabled ? 'Edit' : 'Done'}
        </button>
      </div>
      <div className='w-full flex flex-col items-center'>
        {disabled ? (
          <p className='text-sm text-gray-600'>{bubble.url}</p>
        ) : (
          <>
            {titleInput}
            {linkInput}
          </>
        )}
      </div>
    </div>
  );
};
