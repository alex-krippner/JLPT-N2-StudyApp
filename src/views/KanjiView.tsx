import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@material-ui/core';
import { rateKanji } from '../state-management/redux/kanjiCollection.reducer';
import { RootState } from '../state-management/redux/store';
import CardsContainerTemplate from '../components/templates/CardsContainerTemplate';
import KanjiCard from '../components/organisms/Kanji/KanjiCard';
import { KanjiForm } from '../components/organisms/Kanji/Form/KanjiForm';

const tabLabels: KanjiTabLabels[] = ['読み', '単語例', '用例'];

const KanjiView = () => {
  const dispatch = useDispatch();
  const kanjiState = useSelector((state: RootState) =>
    Object.values(state.kanjiCollection),
  );
  const handleRate = (kanji: string, rating: number) => {
    dispatch(rateKanji({ kanji, rating }));
  };

  const CardFormComponent = <KanjiForm cardData={kanjiState} />;

  return (
    <Box width="100%" height="100%">
      <CardsContainerTemplate
        data={kanjiState}
        label="漢字"
        onRate={handleRate}
        tabLabels={tabLabels}
        CardComponent={KanjiCard}
        CardFormComponent={CardFormComponent}
      />
    </Box>
  );
};

export default KanjiView;
