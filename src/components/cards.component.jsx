import React from 'react';
import Card from './card.component';

const Cards = ({ kanji }) =>
  kanji.map((k) => <Card key={k.id} data={k} />);

export default Cards;
