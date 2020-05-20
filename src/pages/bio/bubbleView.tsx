import React, { FC } from 'react';
import { Bubble } from '../dash/bubbles';

export const BubbleView: FC<{ bubble: Bubble }> = ({ bubble }) => {
  return (
    <div>
      <h1>Title: {bubble.title}</h1>
      <h1>Url: {bubble.url}</h1>
    </div>
  );
};
