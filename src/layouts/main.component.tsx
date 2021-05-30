import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import HomeView from '../views/HomeView';
import KanjiView from '../views/KanjiView';
import VocabView from '../views/VocabView';
import GrammarView from '../views/GrammarView';
import ReadingView from '../views/ReadingView';

const WrapperMain = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100%;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);
  background-color: var(--color-white-medium);
  overflow-y: scroll;

  @media only screen and (max-width: 430px) {
    width: 100%;
  }
`;

const Main = () => (
  <WrapperMain>
    <Switch>
      <Route exact path="/" component={HomeView} />
      <Route path="/kanji" component={KanjiView} />
      <Route path="/vocab" component={VocabView} />
      <Route path="/grammar" component={GrammarView} />
      <Route path="/reading" component={ReadingView} />
    </Switch>
  </WrapperMain>
);
export default Main;
