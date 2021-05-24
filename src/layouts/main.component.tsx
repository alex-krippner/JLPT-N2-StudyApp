import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeView from '../views/homeView.component';
import KanjiView from '../views/KanjiView';
import VocabView from '../views/VocabView';
import GrammarView from '../views/GrammarView';
import ReadingView from '../views/ReadingView';

import { WrapperMain } from '../theme/styledComponents';

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
