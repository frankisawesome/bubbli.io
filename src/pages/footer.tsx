import React from 'react';
import { useLocation } from 'react-router';

export const Footer = () => {
  const inMenu: boolean = useLocation().pathname === '/menu';
  return (
    <div
      className={`${
        inMenu ? 'text-white fixed bottom-0' : 'text-gray-600 footer'
      } flex justify-center items-center pb-4 pr-6`}
    >
      <h1>bubbli.io</h1>
      <span
        className={`${
          inMenu ? 'bg-white text-gray-600' : 'text-white bg-gray-600'
        } rounded-full border border-gray-600 px-3 py-1  text-xl mx-4`}
      >
        <a href='/'>b.</a>
      </span>
    </div>
  );
};
