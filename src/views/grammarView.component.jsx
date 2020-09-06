import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styled from 'styled-components';

import SliderContainer from '../components/sliderContainer.component';
import { rateGrammar } from '../redux/grammar/grammarCollection.actionCreators';
import selectAllGrammar from '../redux/grammar/grammarCollection.selectors';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const tabLabels = ['variations', '意味', '接続', '用例'];

const GrammarView = ({ rateGrammarDispatcher, grammar }) => {
  return (
    <Wrapper>
      <SliderContainer
        data={grammar}
        label="文法"
        onRate={rateGrammarDispatcher}
        tabLabels={tabLabels}
      />
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  grammar: selectAllGrammar,
});

const mapDispatchToProps = (dispatch) => ({
  rateGrammarDispatcher: (grammar, cardType, rating) =>
    dispatch(rateGrammar(grammar, cardType, rating)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GrammarView);
