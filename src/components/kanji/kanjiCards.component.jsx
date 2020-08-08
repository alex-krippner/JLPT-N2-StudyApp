import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Card from '../card.component';

import selectAllKanji from '../../redux/kanji/kanji.selectors';
import { flipCard } from '../utils';

const KanjiCards = ({ kanji }) =>
  kanji.map((k) => (
    <Card
      key={k.id}
      front={k.kanji}
      backTop={k.reading}
      backMid={k.wordSample}
      backBtm={k.sentenceSample}
      id={uuidv4()}
      flipCard={flipCard}
    />
  ));

const mapStateToProps = createStructuredSelector({
  kanji: selectAllKanji,
});

export default connect(mapStateToProps)(KanjiCards);
