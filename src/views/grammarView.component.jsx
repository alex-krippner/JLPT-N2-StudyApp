import React, { useReducer } from 'react';
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

const tabLabels = ['意味', '接続', '用例'];

const INITIAL_FORM = {
  grammar: '',
  variations: [],
  意味: [],
  接続: [],
  用例: [],
};

const grammarFormReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_GRAMMAR':
      return {
        ...state,
        grammar: action.value,
      };

    case 'ADD_ENTRY':
      return {
        ...state,
        [action.entryKey]: [...state[action.entryKey], action.value],
      };

    case 'EDIT_ENTRY':
      return {
        ...state,
        [action.key]: state[action.key].map((el, idx) =>
          idx === action.entryIdx ? action.value : el,
        ),
      };

    case 'REMOVE_ENTRY':
      return {
        ...state,
        [action.key]: state[action.key].filter(
          (el, idx) => idx !== action.entryIdx,
        ),
      };

    default:
      return state;
  }
};

const GrammarView = ({ rateGrammarDispatcher, grammar }) => {
  const [GrammarFormData, dispatchGrammarFormAction] = useReducer(
    grammarFormReducer,
    INITIAL_FORM,
  );
  return (
    <Wrapper>
      <SliderContainer
        data={grammar}
        label="文法"
        inputValue={GrammarFormData.grammar}
        onRate={rateGrammarDispatcher}
        tabLabels={tabLabels}
        cardFormData={GrammarFormData}
        formDispatcher={dispatchGrammarFormAction}
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

// <DndProvider options={HTML5toTouch}>
// <CardContainer
//   data={grammar}
//   label="文法"
//   inputValue={GrammarFormData.grammar}
//   onRate={rateGrammarDispatcher}
//   tabLabels={tabLabels}
//   cardFormData={GrammarFormData}
//   formDispatcher={dispatchGrammarFormAction}
// />
// </DndProvider>
