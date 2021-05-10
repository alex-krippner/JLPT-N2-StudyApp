import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import CardContainer from '../components/containers/CardContainer';
import { rateVocab } from '../redux/vocabCollection.reducer';
import { RootState } from '../redux/store';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const tabLabels: TabLabel[] = ['漢字', '語類', '定義', '用例'];

const VocabView = () => {
  const dispatch = useDispatch();
  const vocabState = useSelector((state: RootState) =>
    Object.values(state.vocabCollection),
  );
  const handleRate = (vocab: string, rating: number) => {
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
