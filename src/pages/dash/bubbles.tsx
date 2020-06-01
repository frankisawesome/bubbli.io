import React, { FC, useState, useContext, useEffect } from 'react';
import Firebase from 'firebase';
import { FirebaseContext } from '../../firebase/Firebase';
import { BubbleEdit } from './bubbleEdit';
export interface Portfolio {
  name: string;
  bubbles: Bubble[];
}

export interface Bubble {
  title: string;
  url: string;
}

export const Bubbles: FC<{ user: Firebase.User }> = ({ user }) => {
  const firebase = useContext(FirebaseContext);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    firebase.db
      .collection('portfolios')
      .doc(user.uid)
      .onSnapshot((snapshot) => {
        const data = snapshot.data() as Portfolio;
        if (data) {
          setPortfolio(data);
        }
      });
  }, []);

  function handleAddElement() {
    setPortfolio((prev) => {
      if (prev) {
        const bubbles = prev.bubbles;
        bubbles.push({
          title: '',
          url: '',
        });
        return {
          name: prev.name,
          bubbles: bubbles,
        };
      } else {
        return null;
      }
    });
  }

  function handleDeleteElement(i: number) {
    setPortfolio((prev) => {
      if (prev) {
        const bubbles = prev.bubbles;
        bubbles.splice(i, 1);
        return {
          name: prev.name,
          bubbles: bubbles,
        };
      } else {
        return null;
      }
    });
  }

  function handleOnChange(i: number, newEl: Bubble) {
    setPortfolio((prev) => {
      if (prev) {
        prev.bubbles[i] = newEl;
        return {
          name: prev.name,
          bubbles: prev.bubbles,
        };
      } else {
        return null;
      }
    });
  }

  function handleSave() {
    if (portfolio) {
      setIsSubmitting(true);
      firebase.db
        .collection('portfolios')
        .doc(user.uid)
        .set(portfolio)
        .then(() => setIsSubmitting(false))
        .then(() => setSaveMessage('Portfolio saved'))
        .catch(() => {
          setSaveMessage('Error saving');
          setIsSubmitting(false);
        });
      setTimeout(() => setSaveMessage(null), 5000);
    }
  }

  return (
    <div className='flex flex-col w-5/6 max-w-xl'>
      {portfolio ? (
        portfolio.bubbles.map((bubble, i) => (
          <BubbleEdit
            bubble={bubble}
            index={i}
            handleDelete={handleDeleteElement}
            handleChange={handleOnChange}
            handleBlur={handleSave}
          />
        ))
      ) : (
        <p>Loading portfolio</p>
      )}
      <button className='btn my-2' onClick={handleAddElement}>
        Create New Bubble
      </button>
      {saveMessage && <p>{saveMessage}</p>}
    </div>
  );
};
