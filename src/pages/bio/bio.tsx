import React, { FC, useEffect, useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { FirebaseContext } from '../../firebase/Firebase';
import { Portfolio } from '../dash/bubbles';
import { BubbleView } from './bubbleView';
type BioParams = {
  name: string;
};

export const Bio: FC<
  RouteComponentProps<BioParams> & {
    toggleNav: React.Dispatch<React.SetStateAction<boolean>>;
  }
> = (props) => {
  const name = props.match.params.name;
  const firebase = useContext(FirebaseContext);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    firebase.db
      .collection('portfolios')
      .where('name', '==', name)
      .onSnapshot((snapshot) => {
        try {
          const received = snapshot.docs[0].data();
          setPortfolio(received as Portfolio);
        } catch (e) {
          setNotFound(true);
        }
      });
  }, []);

  useEffect(() => {
    props.toggleNav(false);
    return () => props.toggleNav(true);
  }, []);
  return (
    <div className='flex flex-col h-full justify-between w-full'>
      <div className='w-full items-center flex flex-col'>
        <h1 className='rounded-full border border-gray-600 px-4 py-1 text-3xl mt-4'>
          b.
        </h1>
        <h1 className='text-2xl my-4'>{name}</h1>
        {portfolio ? (
          portfolio.bubbles.map((bubble) => (
            <BubbleView key={bubble.url} bubble={bubble} />
          ))
        ) : notFound ? (
          <h1>Bubbli bio not found for name {name}</h1>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
      <button className='mb-8'>
        <a className='btn' href='https://bubbli.io'>
          bubbli.io
        </a>
      </button>
    </div>
  );
};
