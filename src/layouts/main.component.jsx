import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import HomeView from '../views/homeView.component';
import KanjiView from '../views/kanjiView.component';
import VocabView from '../views/vocabView.component';
import GrammarView from '../views/grammarView.component';
import ReadingView from '../views/readingView.component';

const Wrapper = styled.div`
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

  /* The emerging W3C standard
   that is currently Firefox-only */

  scrollbar-width: thin;

  scrollbar-color: var(--color-scrollbar);

  /* Works on Chrome/Edge/Safari */
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: var(--color-scrollbar);
  }
  &::-webkit-scrollbar-track-piece:end {
    background: transparent;
    margin-bottom: 20px;
  }

  &::-webkit-scrollbar-track-piece:start {
    background: transparent;
    margin-top: 20px;
  }
`;

const Main = () => (
  <Wrapper>
    <Switch>
      <Route exact path="/" component={HomeView} />
      <Route path="/kanji" component={KanjiView} />
      <Route path="/vocab" component={VocabView} />
      <Route path="/grammar" component={GrammarView} />
      <Route path="/reading" component={ReadingView} />
    </Switch>
  </Wrapper>
);
export default Main;
