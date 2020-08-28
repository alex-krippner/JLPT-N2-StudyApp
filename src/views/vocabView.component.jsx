import React from 'react';
import styled from 'styled-components';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import { DndProvider } from 'react-dnd-multi-backend';


const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const VocabView = () => (
  <Wrapper>
  <DndProvider options={HTML5toTouch}>
  <CardContainer
    data={no data yet}
    label="語彙"
    inputValue={KanjiFormData.kanji} // no input value yet
    onRate={rateKanjiDispatcher} // needed
    tabLabels={tabLabels} // needed
    cardFormData={KanjiFormData} // needed
    formDispatcher={dispatchKanjiFormAction} // needed
  />
</DndProvider>  </Wrapper>
);
export default VocabView;
