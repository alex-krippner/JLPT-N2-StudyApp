import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { rateVocab } from '../redux/vocabCollection.reducer';
import { RootState } from '../redux/store';
import CardsContainerTemplate from '../components/templates/CardsContainerTemplate';
import VocabCard from '../components/organisms/Vocab/VocabCard';

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
      <CardsContainerTemplate
        data={vocabState}
        label="語彙"
        onRate={handleRate}
        tabLabels={tabLabels}
        CardComponent={VocabCard}
      />
    </Wrapper>
  );
};

export default VocabView;