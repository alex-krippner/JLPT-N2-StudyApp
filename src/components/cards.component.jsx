import React from 'react';
import Card from './card.component';

const Cards = ({ kanji }) =>
  kanji.map((k) => (
    <Card
      key={k.id}
      front={k.kanji}
      backTop={k.reading}
      backMid={k.wordSample}
      backBtm={k.sentenceSample}
    />
  ));

export default Cards;
