import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Card from '../card.component';
import Draggable from '../dragAndDropContainer.component';

import selectAllKanji from '../../redux/kanjiCollection/kanjiCollection.selectors';
import { flipCard } from '../components.utils';
import { rateKanji } from '../../redux/kanjiCollection/kanjiCollection.actionCreators';

const KanjiCards = ({ kanji, rateKanjiDispatcher }) =>
  kanji.map((k) => (
    <Draggable key={k.id}>
      {' '}
      <Card
        key={k.id}
        front={k.kanji}
        backTop={k.reading}
        backMid={k.wordSample}
        backBtm={k.sentenceSample}
        rating={k.rating}
        id={uuidv4()}
        flipCard={flipCard}
        rateData={rateKanjiDispatcher}
      />
    </Draggable>
  ));

const mapStateToProps = createStructuredSelector({
  kanji: selectAllKanji,
});

const mapDispatchToProps = (dispatch) => ({
  rateKanjiDispatcher: (kanji, rating) =>
    dispatch(rateKanji(kanji, rating)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KanjiCards);
