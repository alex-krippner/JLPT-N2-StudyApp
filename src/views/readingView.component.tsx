import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import SliderContainer from '../components/containers/SliderContainer';
import { rateReading } from '../redux/readingCollection.reducer';
import { RootState } from '../redux/store';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

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
    <Wrapper>
      <SliderContainer
        data={readingState}
        label="reading"
        onRate={handleRate}
        tabLabels={tabLabels}
        cardType="reading"
      />
    </Wrapper>
  );
};

export default ReadingView;
