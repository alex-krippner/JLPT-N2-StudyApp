import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import SliderContainer from '../components/containers/SliderContainer';
import { rateGrammar } from '../redux/grammarCollection.reducer';
import { RootState } from '../redux/store';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const tabLabels: CardDataKeys[] = [
  'variations',
  '意味',
  '接続',
  '用例',
];

const GrammarView = () => {
  const dispatch = useDispatch();
  const grammarState: GrammarCardData[] = useSelector(
    (state: RootState) => Object.values(state.grammarCollection),
  );
  const handleRate = (grammar: string, rating: number) => {
    dispatch(rateGrammar({ grammar, rating }));
  };

  return (
    <Wrapper>
      <SliderContainer
        data={grammarState}
        label="文法"
        onRate={handleRate}
        tabLabels={tabLabels}
        cardType="grammar"
      />
    </Wrapper>
  );
};

export default GrammarView;
