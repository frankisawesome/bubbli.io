import React, { FC, useEffect, useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { FirebaseContext } from '../../firebase/Firebase';
import { Portfolio } from '../dash/bubbles';
import { BubbleView } from './bubbleView';
type BioParams = {
  name: string;
};

export const Bio: FC<RouteComponentProps<BioParams>> = (props) => {
  const name = props.match.params.name;
  const firebase = useContext(FirebaseContext);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  useEffect(() => {
    firebase.db
      .collection('portfolios')
      .where('name', '==', name)
      .onSnapshot((snapshot) => {
        setPortfolio(snapshot.docs[0].data() as Portfolio);
      });
  }, []);
  return (
    <div>
      {portfolio ? (
        portfolio.bubbles.map((bubble) => <BubbleView bubble={bubble} />)
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
};
