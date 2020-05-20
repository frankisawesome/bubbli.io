import React, { FC } from 'react';
import { Bubble } from './bubbles';

export const BubbleEdit: FC<{
  bubble: Bubble;
  index: number;
  handleDelete: (i: number) => void;
  handleChange: (i: number, newEl: Bubble) => void;
}> = ({ bubble, index, handleDelete, handleChange }) => {
  return (
    <div>
      <label>Title</label>
      <input
        value={bubble.title}
        onChange={(e) =>
          handleChange(index, { url: bubble.url, title: e.target.value })
        }
      ></input>
      <label>Url</label>
      <input
        value={bubble.url}
        onChange={(e) =>
          handleChange(index, { url: e.target.value, title: bubble.title })
        }
      ></input>
      <button onClick={() => handleDelete(index)}>Delete</button>
    </div>
  );
};
