import React, { useState } from 'react';

export const Themes = () => {
  const [mode, setMode] = useState<
    'default' | 'bubble' | 'background' | 'text'
  >('default');

  switch (mode) {
    case 'default':
      return (
        <div className='w-full flex space-x-2 md:justify-between'>
          <button className='btn' onClick={() => setMode('bubble')}>
            bubble colour
          </button>
          <button className='btn'>background</button>
          <button className='btn'>text colour</button>
        </div>
      );
    case 'bubble':
      return (
        <div className='w-3/4 flex justify-between'>
          <p className='self-center text-gray-600'>select theme:</p>
          <div className='w-3/4 flex space-x-4 my-4'>
            <div className='w-12 h-12 rounded-full bg-gray-600'></div>
            <div className='w-12 h-12 rounded-full bg-teal-600'></div>
            <div className='w-12 h-12 rounded-full bg-pink-600'></div>
            <button className="btn" onClick={() => setMode("default")}>back</button>
          </div>
        </div>
      );
    case 'background':
    case 'text':
    default:
      return <div>error</div>;
  }
};
