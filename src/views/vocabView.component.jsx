import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import CardContainer from '../components/containers/CardContainer';
import { rateVocab } from '../redux/vocabCollection/vocabCollection.reducer';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const tabLabels = ['漢字', '語類', '定義', '用例'];

const VocabView = () => {
  const dispatch = useDispatch();
  const vocabState = useSelector((state) =>
    Object.values(state.vocabCollection),
  );
  const handleRate = (vocab, rating) => {
    dispatch(rateVocab({ vocab, rating }));
  };

  return (
    <Wrapper>
      <CardContainer
        data={vocabState}
        label="語彙"
        onRate={handleRate}
        tabLabels={tabLabels}
      />
    </Wrapper>
  );
};

export default VocabView;
