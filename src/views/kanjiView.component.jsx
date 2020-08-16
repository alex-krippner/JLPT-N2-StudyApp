import React from 'react';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import { DndProvider } from 'react-dnd-multi-backend';
import styled from 'styled-components';

import CardProject from '../components/dragAndDrop/CardProject';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const KanjiView = () => (
  <Wrapper>
    <DndProvider options={HTML5toTouch}>
      <CardProject />
    </DndProvider>
  </Wrapper>
);

export default KanjiView;
