import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import homeView from '../views/homeView.component';
import KanjiView from '../views/kanjiView.component';
import VocabView from '../views/vocabView.component';
import GrammarView from '../views/grammarView.component';
import ReadingView from '../views/readingView.component';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100%;
  border-radius: 3rem;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  overflow-y: scroll;
`;

const Main = () => (
  <Wrapper>
    <Switch>
      <Route exact path="/" component={homeView} />
      <Route path="/kanji" component={KanjiView} />
      <Route path="/vocabulary" component={VocabView} />
      <Route path="/grammar" component={GrammarView} />
      <Route path="/reading" component={ReadingView} />
    </Switch>
  </Wrapper>
);
export default Main;
