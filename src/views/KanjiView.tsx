import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@material-ui/core';
import { rateKanji } from '../redux/kanjiCollection.reducer';
import { RootState } from '../redux/store';
import CardContainerTest from '../components/containers/CardContainerTest.';
import KanjiCard from '../components/organisms/Kanji/KanjiCard';

const tabLabels: KanjiTabLabels[] = ['読み', '単語例', '用例'];

const KanjiView = () => {
  const dispatch = useDispatch();
  const kanjiState = useSelector((state: RootState) =>
    Object.values(state.kanjiCollection),
  );
  const handleRate = (kanji: string, rating: number) => {
    dispatch(rateKanji({ kanji, rating }));
  };
  return (
    <Box width="100%" height="100%">
      <CardContainerTest
        data={kanjiState}
        label="漢字"
        onRate={handleRate}
        tabLabels={tabLabels}
        CardComponent={KanjiCard}
      />
    </Box>
  );
};

export default KanjiView;
