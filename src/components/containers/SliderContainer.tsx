/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';

import CardGrammar from '../card/CardGrammar';
import CardReading from '../card/CardReading';
import AddCardPopover from '../card/AddCardPopover';

const SliderContainerStyled = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  padding: 0 6rem;
`;

SwiperCore.use([Pagination]);

type SliderContainerProps = {
  data: CardDataType[];
  cardType: CardType;
  onRate: (
    label: string[] | string | number | null | (string & string[]),
    ratingIndex: number,
  ) => void;
  tabLabels: CardDataKeys[];
  label: CardLabels;
};

function slidesCreator(
  data: CardDataType[],
  cardType: CardType,
  onRate: (
    label: string[] | string | number | null | (string & string[]),
    ratingIndex: number,
  ) => void,
  tabLabels: CardDataKeys[],
  label: CardLabels,
) {
  const createdSlides = data.map((el) => {
    return cardType === 'grammar' ? (
      <SwiperSlide key={`slide-grammar-${el.id}`} tag="li">
        <CardGrammar
          cardData={el}
          onRate={onRate}
          tabLabels={tabLabels}
          label={label}
        />
      </SwiperSlide>
    ) : cardType === 'reading' ? (
      <SwiperSlide key={`slide-reading-${el.id}`} tag="li">
        <CardReading
          cardData={el}
          onRate={onRate}
          tabLabels={tabLabels}
          label={label}
        />
      </SwiperSlide>
    ) : (
      ''
    );
  });

  return createdSlides;
}

const SliderContainer = ({
  data,
  onRate,
  tabLabels,
  label,
  cardType,
}: SliderContainerProps) => {
  const slides = slidesCreator(
    data,
    cardType,
    onRate,
    tabLabels,
    label,
  );

  return (
    <SliderContainerStyled>
      <AddCardPopover
        tabLabels={tabLabels}
        cardData={data}
        label={label}
        cardType={cardType}
      />

      <Swiper
        id="main"
        pagination={{ clickable: true }}
        spaceBetween={3}
        slidesPerView={1}
        onClick={(swiper) => swiper.setGrabCursor()}
      >
        {slides}
        <div className="swiper-pagination" />
      </Swiper>
    </SliderContainerStyled>
  );
};

export default SliderContainer;
