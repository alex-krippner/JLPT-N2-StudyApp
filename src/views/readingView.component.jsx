import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styled from 'styled-components';

import SliderContainer from '../components/sliderContainer.component';
import { rateReading } from '../redux/readingCollection/readingCollection.actionCreators';
import selectAllReading from '../redux/readingCollection/readingCollection.selectors';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const tabLabels = ['question', 'answerChoices', 'solution'];

const ReadingView = ({ rateReadingDispatcher, reading }) => {
  return (
    <Wrapper>
      <SliderContainer
        data={reading}
        label="reading"
        onRate={rateReadingDispatcher}
        tabLabels={tabLabels}
        cardType="reading"
      />
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  reading: selectAllReading,
});

const mapDispatchToProps = (dispatch) => ({
  rateReadingDispatcher: (reading, cardType, rating) =>
    dispatch(rateReading(reading, cardType, rating)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReadingView);
