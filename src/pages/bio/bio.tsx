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
    <div>
      {portfolio ? (
        portfolio.bubbles.map((bubble) => (
          <BubbleView key={bubble.url} bubble={bubble} />
        ))
      ) : notFound ? (
        <h1>Bubble portfolio not found</h1>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
};
