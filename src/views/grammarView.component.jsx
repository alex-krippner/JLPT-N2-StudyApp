import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import SliderContainer from '../components/containers/sliderContainer.component';
import { rateGrammar } from '../redux/grammar/grammarCollection.actionCreators';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const tabLabels = ['variations', '意味', '接続', '用例'];

const GrammarView = () => {
  const dispatch = useDispatch();

  const handleRate = (grammar, rating) => {
    dispatch(rateGrammar(grammar, rating));
  };
  let grammar = useSelector((state) => state.grammarCollection);
  grammar = Object.values(grammar);
  return (
    <Wrapper>
      <SliderContainer
        data={grammar}
        label="文法"
        onRate={handleRate}
        tabLabels={tabLabels}
        cardType="grammar"
      />
    </Wrapper>
  );
};

export default GrammarView;
