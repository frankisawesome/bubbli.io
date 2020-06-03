import React from 'react';

interface ErrorMessageProps {
  errorTitle: string;
  errorMessage: string;
  closeCallback: () => void;
}

export const ErrorMessage = (props: ErrorMessageProps) => {
  return (
    <div
      className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative'
      role='alert'
    >
      <strong className='font-bold'>{props.errorTitle}</strong>
      <span className='block sm:inline'>{props.errorMessage}</span>
      <span
        className='absolute top-0 bottom-0 right-0 px-4 py-3'
        onClick={props.closeCallback}
      >
        <svg
          className='fill-current h-6 w-6 text-red-500'
          role='button'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
        >
          <button>Close</button>
          <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
        </svg>
      </span>
    </div>
  );
};
