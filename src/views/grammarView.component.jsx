import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import SliderContainer from '../components/containers/sliderContainer.component';
// import { rateGrammar } from '../redux/grammar/grammarCollection.actionCreators';
import { rateGrammar } from '../redux/grammar/grammarCollection.reducer';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const tabLabels = ['variations', '意味', '接続', '用例'];

const GrammarView = () => {
  const dispatch = useDispatch();
  const grammarState = useSelector((state) =>
    Object.values(state.grammarCollection),
  );
  const handleRate = (grammar, rating) => {
    dispatch(rateGrammar(grammar, rating));
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
