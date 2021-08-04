import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';

import { rateGrammar } from '../state-management/redux/grammarCollection.reducer';
import { RootState } from '../state-management/redux/store';
import SlidesContainerTemplate from '../components/templates/SlidesContainerTemplate';
import GrammarCard from '../components/organisms/Grammar/GrammarCard';
import { GrammarForm } from '../components/organisms/Grammar/Form/GrammarForm';

const tabLabels: TabLabel[] = ['variations', '意味', '接続', '用例'];

const GrammarView = () => {
  const dispatch = useDispatch();
  const grammarState: GrammarCardData[] = useSelector(
    (state: RootState) => Object.values(state.grammarCollection),
  );
  const handleRate = (grammar: string, rating: number) => {
    dispatch(rateGrammar({ grammar, rating }));
  };

  const CardFormComponent = <GrammarForm cardData={grammarState} />;

  return (
    <Box width="100%" height="100%">
      <SlidesContainerTemplate
        data={grammarState}
        label="文法"
        onRate={handleRate}
        tabLabels={tabLabels}
        CardComponent={GrammarCard}
        CardFormComponent={CardFormComponent}
      />
    </Box>
  );
};

export default GrammarView;
