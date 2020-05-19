import React, { FC } from 'react';
import { Element } from './elementEditor';

export const ElementView: FC<{
  element: Element;
  index: number;
  handleDelete: (i: number) => void;
  handleChange: (i: number, newEl: Element) => void;
}> = ({ element, index, handleDelete, handleChange }) => {
  return (
    <div>
      <label>Title</label>
      <input
        value={element.title}
        onChange={(e) =>
          handleChange(index, { url: element.url, title: e.target.value })
        }
      ></input>
      <label>Url</label>
      <input
        value={element.url}
        onChange={(e) =>
          handleChange(index, { url: e.target.value, title: element.title })
        }
      ></input>
      <button onClick={() => handleDelete(index)}>Delete</button>
    </div>
  );
};
