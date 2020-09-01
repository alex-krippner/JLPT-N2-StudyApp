import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';
import 'swiper/swiper.scss';

import Card from './card.component';
import { flipCard } from './components.utils';

// import { CardFormContext } from '../context/context';

// import CardForm from './cardForm.component';

const SliderContainerStyled = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  padding: 3rem;
`;

const SliderContainer = ({ data, onRate, tabLabels }) => {
  const slides = data.map((el, index) => (
    <SwiperSlide key={`slide-${uuidv4()}`} tag="li">
      <Card
        cardData={el}
        key={uuidv4()}
        index={index}
        rating={el.rating}
        onRate={onRate}
        tabLabels={tabLabels}
        flipCard={flipCard}
      />
    </SwiperSlide>
  ));

  return (
    <SliderContainerStyled>
      <Swiper
        id="main"
        spaceBetween={0}
        slidesPerView={1}
        onInit={
          (swiper) => console.log('Swiper initialized!', swiper)
          // eslint-disable-next-line react/jsx-curly-newline
        }
        onSlideChange={(swiper) => {
          console.log('Slide index changed to: ', swiper.activeIndex);
        }}
        onReachEnd={() => console.log('Swiper end reached')}
      >
        {slides}{' '}
      </Swiper>
    </SliderContainerStyled>
  );
};

export default SliderContainer;

// <CardFormContext.Provider
// value={{ cardFormData, formDispatcher }}
// >
// <CardForm
//   label={label}
//   inputValue={inputValue}
//   tabLabels={tabLabels}
// />
// </CardFormContext.Provider>
