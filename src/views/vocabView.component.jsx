import React from 'react';
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

const tabLabels = ['漢字', '語類', '定義', '用例'];

const VocabView = ({ vocab, rateVocabDispatcher }) => {
  return (
    <Wrapper>
      <DndProvider options={HTML5toTouch}>
        <CardContainer
          data={vocab}
          label="語彙"
          onRate={rateVocabDispatcher}
          tabLabels={tabLabels}
        />
      </DndProvider>
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

// const vocabFormReducer = (state, action) => {
//   switch (action.type) {
//     case 'INPUT_VOCAB':
//       return {
//         ...state,
//         kana: action.value,
//       };
//     case 'ADD_ENTRY':
//       return {
//         ...state,
//         [action.entryKey]: [...state[action.entryKey], action.value],
//       };
//     case 'EDIT_ENTRY':
//       return {
//         ...state,
//         [action.key]: state[action.key].map((el, idx) =>
//           idx === action.entryIdx ? action.value : el,
//         ),
//       };
//     case 'REMOVE_ENTRY':
//       return {
//         ...state,
//         [action.key]: state[action.key].filter(
//           (el, idx) => idx !== action.entryIdx,
//         ),
//       };
//     default:
//       return state;
//   }
// };
