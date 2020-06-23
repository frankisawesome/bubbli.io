import React, { FC, useState, useContext, useEffect } from 'react';
import Firebase from 'firebase';
import { FirebaseContext } from '../../firebase/Firebase';
import { BubbleEdit } from './bubbleEdit';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
export interface Portfolio {
  name: string;
  bubbles: Bubble[];
}

export interface Bubble {
  title: string;
  url: string;
  type: 'photo' | 'paragraph' | 'link';
  text: string;
}

export const Bubbles: FC<{ user: Firebase.User }> = ({ user }) => {
  const firebase = useContext(FirebaseContext);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>();
  const [modal, setModal] = useState(-1);

  //fetch portfolio for user on mount
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

  //saves when bubbles.length change so delete ops are synced
  useEffect(() => {
    if (portfolio) {
      handleSave();
    }
  }, [portfolio?.bubbles]);

  //should do nothing when the portfolio is still loading
  function handleAddElement() {
    setPortfolio((prev) => {
      if (prev) {
        const bubbles = prev.bubbles;
        if (bubbles.length < 4) {
          bubbles.push({
            title: '',
            url: '',
            type: 'link',
            text: '',
          });
        } else {
          window.alert(
            'We currently have a 4 bubbles per user limit (dev message)'
          );
        }
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
      firebase.db
        .collection('portfolios')
        .doc(user.uid)
        .set(portfolio)
        .then(() => setSaveMessage('Portfolio saved'))
        .catch(() => {
          setSaveMessage('Error saving');
        });
      setTimeout(() => setSaveMessage(null), 5000);
    }
  }

  const BubbleList = portfolio?.bubbles.map((bubble, i) => (
    <Draggable draggableId={`${i}`} index={i}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <BubbleEdit
            bubble={bubble}
            index={i}
            handleDelete={handleDeleteElement}
            handleChange={handleOnChange}
            handleBlur={handleSave}
            modal={modal}
            setModal={setModal}
            isDragging={snapshot.isDragging}
          />
        </div>
      )}
    </Draggable>
  ));

  const reorder = (list: Bubble[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    if (portfolio) {
      const bubbles: Bubble[] = reorder(
        portfolio.bubbles,
        result.source.index,
        result.destination.index
      );

      setPortfolio((prev: Portfolio | null) => {
        if (prev) {
          return {
            name: prev?.name,
            bubbles: bubbles,
          };
        } else {
          return null;
        }
      });
    }
  }

  return (
    <div className='flex flex-col w-full max-w-xl'>
      {portfolio ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='list'>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {BubbleList}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <p>Loading portfolio</p>
      )}
      <button className='btn-alt-2 my-2' onClick={handleAddElement}>
        Create New Bubble
      </button>
      {saveMessage && <p>{saveMessage}</p>}
    </div>
  );
};
