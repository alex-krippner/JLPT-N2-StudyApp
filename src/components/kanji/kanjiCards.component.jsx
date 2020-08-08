import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Card from '../card.component';

const KanjiCards = ({ kanji }) =>
  kanji.map((k) => (
    <Card
      key={k.id}
      front={k.kanji}
      backTop={k.reading}
      backMid={k.wordSample}
      backBtm={k.sentenceSample}
      id={uuidv4()}
    />
  ));

export default KanjiCards;
