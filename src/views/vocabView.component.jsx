import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import CardContainer from '../components/dragAndDrop/CardContainer.component';
import { rateVocab } from '../redux/vocabCollection/vocabCollection.actionCreators';
import selectAllVocab from '../redux/vocabCollection/vocabCollection.selectors';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const tabLabels = ['漢字', '語類', '定義', '用例'];

const VocabView = ({ vocab, rateVocabDispatcher }) => {
  return (
    <Wrapper>
      <CardContainer
        data={vocab}
        label="語彙"
        onRate={rateVocabDispatcher}
        tabLabels={tabLabels}
      />
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  vocab: selectAllVocab,
});

const mapDispatchToProps = (dispatch) => ({
  rateVocabDispatcher: (vocab, cardType, rating) =>
    dispatch(rateVocab(vocab, cardType, rating)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VocabView);
