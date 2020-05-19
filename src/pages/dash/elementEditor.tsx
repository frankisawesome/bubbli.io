import React, { FC, useState, useContext, useEffect } from 'react';
import Firebase from 'firebase';
import { FirebaseContext } from '../../firebase/Firebase';
import { ElementView } from './elementView';
interface Portfolio {
  uid: string;
  elements: Element[];
}

export interface Element {
  title: string;
  url: string;
}

export const ElementEditor: FC<{ user: Firebase.User }> = ({ user }) => {
  const firebase = useContext(FirebaseContext);
  const [portfolio, setPortfolio] = useState<Portfolio>({
    uid: user.uid,
    elements: [],
  });

  function handleAddElement() {
    setPortfolio((prev) => {
      const elements = prev.elements;
      elements.push({
        title: '',
        url: '',
      });
      return {
        uid: user.uid,
        elements: elements,
      };
    });
  }

  function handleDeleteElement(i: number) {
    setPortfolio((prev) => {
      const elements = prev.elements;
      elements.splice(i, 1);
      return {
        uid: user.uid,
        elements: elements,
      };
    });
  }

  function handleOnChange(i: number, newEl: Element) {
    setPortfolio((prev) => {
      prev.elements[i] = newEl;
      return {
        uid: user.uid,
        elements: prev.elements,
      };
    });
  }

  return (
    <div>
      {portfolio.elements !== [] ? (
        portfolio.elements.map((element, i) => (
          <ElementView
            element={element}
            index={i}
            handleDelete={handleDeleteElement}
            handleChange={handleOnChange}
          />
        ))
      ) : (
        <p>No Elements!</p>
      )}
      <button onClick={handleAddElement}>Add Element</button>
    </div>
  );
};
