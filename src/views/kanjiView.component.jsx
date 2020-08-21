import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import { DndProvider } from 'react-dnd-multi-backend';

import styled from 'styled-components';

import CardContainer from '../components/dragAndDrop/CardContainer.component';
import { rateKanji } from '../redux/kanjiCollection/kanjiCollection.actionCreators';
import selectAllKanji from '../redux/kanjiCollection/kanjiCollection.selectors';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const KanjiView = ({ kanji, rateKanjiDispatcher }) => (
  <Wrapper>
    <DndProvider options={HTML5toTouch}>
      <CardContainer data={kanji} onRate={rateKanjiDispatcher} />
    </DndProvider>
  </Wrapper>
);

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
)(KanjiView);
