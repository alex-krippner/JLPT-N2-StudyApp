import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Card from '../card.component';
import Draggable from '../dragAndDropContainer.component';

import selectAllKanji from '../../redux/kanjiCollection/kanjiCollection.selectors';
import { flipCard } from '../components.utils';
import { rateKanji } from '../../redux/kanjiCollection/kanjiCollection.actionCreators';

const KanjiCards = ({
  kanji,
  rateKanjiDispatcher,
  height,
  draggedIndex,
  dragOrder,
  order,
  handleDrag,
  handleDragEnd,
}) => {
  return kanji.map((k, idx) => {
    const isDragging = draggedIndex === idx;
    const top = dragOrder.indexOf(idx) * (height + 20);
    const draggedTop = order.indexOf(idx) * (height + 20);
    return (
      <Draggable
        key={k.id}
        id={idx}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      >
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
          isDragging={isDragging}
          top={isDragging ? draggedTop : top}
          height={height}
        />
      </Draggable>
    );
  });
};

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
