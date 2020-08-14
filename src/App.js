import React from 'react';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import { DndProvider } from 'react-dnd-multi-backend';

import GlobalStyle from './theme/globalStyle';
import CardProject from './components/dragAndDrop/CardProject';

const App = () => (
  <>
    <GlobalStyle />
    <DndProvider options={HTML5toTouch}>
      <CardProject />
    </DndProvider>
  </>
);

export default App;
