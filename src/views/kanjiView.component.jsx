import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import { DndProvider } from 'react-dnd-multi-backend';

import styled from 'styled-components';

import CardContainer from '../components/dragAndDrop/CardContainer.component';
import { rateKanji } from '../redux/kanjiCollection/kanjiCollection.actionCreators';
import selectAllKanji from '../redux/kanjiCollection/kanjiCollection.selectors';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const tabLabels = ['読み', '単語例', '用例'];

const INITIAL_FORM = {
  kanji: '',
  読み: [],
  単語例: [],
  用例: [],
};

const kanjiFormReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_KANJI':
      return {
        ...state,
        kanji: action.value,
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

const KanjiView = ({ kanji, rateKanjiDispatcher }) => {
  const [KanjiFormData, dispatchKanjiFormAction] = useReducer(
    kanjiFormReducer,
    INITIAL_FORM,
  );

  return (
    <Wrapper>
      <DndProvider options={HTML5toTouch}>
        <CardContainer
          data={kanji}
          label="漢字"
          inputValue={KanjiFormData.kanji}
          onRate={rateKanjiDispatcher}
          tabLabels={tabLabels}
          cardFormData={KanjiFormData}
          formDispatcher={dispatchKanjiFormAction}
        />
      </DndProvider>
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  kanji: selectAllKanji,
});

const mapDispatchToProps = (dispatch) => ({
  rateKanjiDispatcher: (kanji, cardType, rating) =>
    dispatch(rateKanji(kanji, cardType, rating)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KanjiView);
