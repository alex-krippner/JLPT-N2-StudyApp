import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';

import { rateGrammar } from '../redux/grammarCollection.reducer';
import { RootState } from '../redux/store';
import SlidesContainerTemplate from '../components/templates/SlidesContainerTemplate';
import GrammarCard from '../components/organisms/Grammar/GrammarCard';

const tabLabels: TabLabel[] = ['variations', '意味', '接続', '用例'];

const GrammarView = () => {
  const dispatch = useDispatch();
  const grammarState: GrammarCardData[] = useSelector(
    (state: RootState) => Object.values(state.grammarCollection),
  );
  const handleRate = (grammar: string, rating: number) => {
    dispatch(rateGrammar({ grammar, rating }));
  };

  return (
    <Box width="100%" height="100%">
      <SlidesContainerTemplate
        data={grammarState}
        label="文法"
        onRate={handleRate}
        tabLabels={tabLabels}
        cardType="grammar"
        CardComponent={GrammarCard}
      />
    </Box>
  );
};

export default GrammarView;
