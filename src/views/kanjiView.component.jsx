import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import { DndProvider } from 'react-dnd-multi-backend';

import styled from 'styled-components';

import CardContainer from '../components/dragAndDrop/CardContainer.component';
import selectAllKanji from '../redux/kanjiCollection/kanjiCollection.selectors';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const KanjiView = ({ kanji }) => (
  <Wrapper>
    <DndProvider options={HTML5toTouch}>
      <CardContainer data={kanji} />
    </DndProvider>
  </Wrapper>
);

const mapStateToProps = createStructuredSelector({
  kanji: selectAllKanji,
});

export default connect(mapStateToProps)(KanjiView);
