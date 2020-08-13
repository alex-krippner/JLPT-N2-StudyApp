import React from 'react';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import { DndProvider } from 'react-dnd-multi-backend';

import GlobalStyle from './theme/globalStyle';
import KanjiCardsContainer from './components/kanji/kanjiCardsContainer.component';
import Project from './components/dragAndDrop/Project';

const App = () => (
  <>
    <GlobalStyle />
    <DndProvider options={HTML5toTouch}>
      <Project />
    </DndProvider>

    <KanjiCardsContainer />
  </>
);

export default App;
