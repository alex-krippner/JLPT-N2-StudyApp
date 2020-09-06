import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styled from 'styled-components';

import CardContainer from '../components/dragAndDrop/CardContainer.component';
import { rateKanji } from '../redux/kanjiCollection/kanjiCollection.actionCreators';
import selectAllKanji from '../redux/kanjiCollection/kanjiCollection.selectors';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const tabLabels = ['読み', '単語例', '用例'];

const KanjiView = ({ kanji, rateKanjiDispatcher }) => {
  return (
    <Wrapper>
      <CardContainer
        data={kanji}
        label="漢字"
        onRate={rateKanjiDispatcher}
        tabLabels={tabLabels}
      />
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  kanji: selectAllKanji,
});

const mapDispatchToProps = (dispatch) => ({
  rateKanjiDispatcher: (kanji, cardType, rating) =>
    dispatch(rateKanji(kanji, cardType, rating)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KanjiView);
