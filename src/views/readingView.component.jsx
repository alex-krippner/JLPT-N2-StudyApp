import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import SliderContainer from '../components/containers/sliderContainer.component';
import { rateReading } from '../redux/readingCollection/readingCollection.actionCreators';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const tabLabels = ['passage', 'question', 'choices', 'solution'];

const ReadingView = () => {
  const dispatch = useDispatch();
  const readingState = useSelector((state) =>
    Object.values(state.readingCollection),
  );

  const handleRate = (reading, rating) => {
    dispatch(rateReading(reading, rating));
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
