import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@material-ui/core';
import { rateReading } from '../state-management/redux/readingCollection.reducer';
import { RootState } from '../state-management/redux/store';
import ReadingCard from '../components/organisms/Reading/ReadingCard';
import SlidesContainerTemplate from '../components/templates/SlidesContainerTemplate';
import { ReadingForm } from '../components/organisms/Reading/Form/ReadingForm';

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

  const CardFormComponent = (
    <ReadingForm cardData={readingState} editing={false} />
  );
  return (
    <Box width="100%" height="100%">
      <SlidesContainerTemplate
        data={readingState}
        label="reading"
        onRate={handleRate}
        tabLabels={tabLabels}
        CardComponent={ReadingCard}
        CardFormComponent={CardFormComponent}
      />
    </Box>
  );
};

export default ReadingView;
