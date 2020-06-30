import React, { FC, useState, useEffect } from 'react';
import { Bubble } from './bubbles';
import { Tooltip } from 'react-tippy';

export const BubbleEdit: FC<{
  bubble: Bubble;
  index: number;
  handleDelete: (i: number) => void;
  //this changes one particular bubble in the portfolio (normally this current one)
  handleChange: (i: number, newEl: Bubble) => void;
  //this actually syncs the entire portfolio
  handleBlur: () => void;
  setModal: (i: number) => void;
  modal: number;
  isDragging: boolean;
}> = ({
  bubble,
  index,
  handleDelete,
  handleChange,
  handleBlur,
  setModal,
  modal,
  isDragging,
}) => {
  const [disabled, setDisabled] = useState<boolean>(true);

  //If the bubble is empty, it should automatically be in deit view
  useEffect(() => {
    if (!bubble.title && !bubble.url) {
      setDisabled(false);
    }
  }, []);

  //Sets the modal index so other bubbles know how to behave
  useEffect(() => {
    if (!disabled) {
      setModal(index);
    } else {
      setModal(-1);
    }
  }, [disabled]);

  //event on clicking 'edit button'
  function handleEdit() {
    if (!disabled && bubble.title === '' && bubble.url === '') {
      setDisabled(false);
      deleteAndReset();
    }
    setDisabled((prev) => !prev);
  }

  //event that performs delete op
  function deleteAndReset() {
    //only show the confirm message if bubble isn't empty
    if (bubble.title !== '' || bubble.url !== '' || bubble.text !== '') {
      //confirm deletion
      if (window.confirm('Are you sure you want to delete this bubble?')) {
        handleDelete(index);
        setModal(-1);
      }
    }
    //when bubble is empty delete op requires no confirmation
    else {
      handleDelete(index);
      setModal(-1);
    }
  }

  function changeType(type: 'paragraph' | 'link' | 'photo') {
    handleChange(index, {
      url: bubble.url ? bubble.url : '',
      title: bubble.title,
      type: type,
      text: bubble.text ? bubble.text : '',
    });
  }

  const titleInput = (
    <div className='max-w-md w-full'>
      <label>title: </label>
      <input
        disabled={disabled}
        className={`my-2 ${disabled ? 'form-input-disabled' : 'form-input'}`}
        value={bubble.title}
        onChange={(e) =>
          handleChange(index, {
            url: bubble.url ? bubble.url : '',
            title: e.target.value,
            type: bubble.type,
            text: bubble.text ? bubble.text : '',
          })
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
            type: bubble.type,
            text: bubble.text ? bubble.text : '',
          })
        }
        onBlur={handleBlur}
      ></input>
    </div>
  );

  const paragraphInput = (
    <div className='max-w-md w-full'>
      <label>text: </label>
      <input
        disabled={disabled}
        className={`my-2 ${disabled ? ' form-input-disabled' : 'form-input'}`}
        value={bubble.text}
        onChange={(e) =>
          handleChange(index, {
            url: bubble.url ? bubble.url : '',
            title: bubble.title,
            type: bubble.type,
            text: e.target.value,
          })
        }
        onBlur={handleBlur}
      ></input>
    </div>
  );
  return (
    <div
      className={`flex flex-col bubble my-2 justify-center items-center ${
        index === modal && 'modal sm:modal-lg'
      }
      ${index !== modal && modal !== -1 && 'opacity-25'}
      ${isDragging && 'bg-gray-200'}
      `}
    >
      {/* top level buttons and title */}
      <div className='flex w-full'>
        <div className='box justify-start'>
          <button className='btn-alt-del' onClick={() => deleteAndReset()}>
            delete
          </button>
        </div>

        {disabled ? (
          <h1 className='text-xl box justify-center'>{bubble.title}</h1>
        ) : (
          <h1 className='text-xl font-semibold box justify-center'>Edit</h1>
        )}
        <div className='box justify-end'>
          <button className='btn-alt' onClick={() => handleEdit()}>
            {disabled ? 'edit' : 'done'}
          </button>
        </div>
      </div>
      {/* second level display url or inputs */}
      <div className='w-full flex flex-col items-center justify-center'>
        {disabled ? (
          <>
            <p className='text-sm text-gray-600 mx-4'>{bubble.url}</p>
            <p className='text-sm text-gray-600 mx-4'>{bubble.text}</p>
          </>
        ) : (
          <>
            {titleInput}
            {bubble.type === 'link' && linkInput}
            {bubble.type === 'paragraph' && paragraphInput}
          </>
        )}
      </div>
      {/* third level bubble types*/}
      {disabled ? (
        <h1 className='font-bold text-gray-600'>{bubble.type}</h1>
      ) : (
        <div className='flex space-x-2 text-gray-600'>
          <div className='box justify-start'>
            <Tooltip
              trigger='mouseenter'
              title='Sorry, photo is currently not supported in alpha'
              theme='light'
              position='top'
            >
              <button
                className={`${bubble.type == 'photo' && 'font-bold'}`}
                onClick={() => changeType('photo')}
                disabled={true}
              >
                Photo
              </button>
            </Tooltip>
          </div>
          <div className='box justify-center'>
            <button
              className={`${bubble.type == 'link' && 'font-bold'}`}
              onClick={() => changeType('link')}
              disabled={disabled}
            >
              Link
            </button>
          </div>

          <div className='box justify-end'>
            <button
              className={`${bubble.type == 'paragraph' && 'font-bold'}`}
              onClick={() => changeType('paragraph')}
              disabled={disabled}
            >
              Paragragh
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
