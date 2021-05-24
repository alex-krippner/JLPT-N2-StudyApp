import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@material-ui/core';
import { rateReading } from '../state-management/redux/readingCollection.reducer';
import { RootState } from '../state-management/redux/store';
import ReadingCard from '../components/organisms/Reading/ReadingCard';
import SlidesContainerTemplate from '../components/templates/SlidesContainerTemplate';

const tabLabels: TabLabel[] = [
  'passage',
  'question',
  'choices',
  'solution',
];

const ReadingView = () => {
  const dispatch = useDispatch();
  const readingState = useSelector((state: RootState) =>
    Object.values(state.readingCollection),
  );

  const handleRate = (readingId: string, rating: number) => {
    dispatch(rateReading({ readingId, rating }));
  };
  return (
    <Box width="100%" height="100%">
      <SlidesContainerTemplate
        data={readingState}
        label="reading"
        onRate={handleRate}
        tabLabels={tabLabels}
        cardType="reading"
        CardComponent={ReadingCard}
      />
    </Box>
  );
};

export default ReadingView;
