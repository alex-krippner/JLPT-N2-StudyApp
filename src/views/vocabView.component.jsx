import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import { DndProvider } from 'react-dnd-multi-backend';
import styled from 'styled-components';

import CardContainer from '../components/dragAndDrop/CardContainer.component';
import { rateVocab } from '../redux/vocabCollection/vocabCollection.actionCreators';
import selectAllVocab from '../redux/vocabCollection/vocabCollection.selectors';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const tabLabels = ['語類', '定義', '用例'];

const INITIAL_FORM = {
  vocab: '',
  語類: [],
  定義: [],
  用例: [],
};

const vocabFormReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_VOCAB':
      return {
        ...state,
        vocab: action.value,
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

const VocabView = ({ vocab, rateVocabDispatcher }) => {
  const [VocabFormData, dispatchVocabFormAction] = useReducer(
    vocabFormReducer,
    INITIAL_FORM,
  );

  return (
    <Wrapper>
      <DndProvider options={HTML5toTouch}>
        <CardContainer
          data={vocab}
          label="語彙"
          inputValue={VocabFormData.vocab}
          onRate={rateVocabDispatcher}
          tabLabels={tabLabels}
          cardFormData={VocabFormData}
          formDispatcher={dispatchVocabFormAction}
        />
      </DndProvider>
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  vocab: selectAllVocab,
});

const mapDispatchToProps = (dispatch) => ({
  rateVocabDispatcher: (vocab, rating) =>
    dispatch(rateVocab(vocab, rating)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VocabView);
