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

type SliderContainerProps<T, K extends keyof T> = {
  data: T[];
  cardType: CardType;
  onRate: (
    label: string[] | string | number | null | (string & string[]),
    ratingIndex: number,
  ) => void;
  tabLabels: K[];
  label: CardLabels;
};

function slidesCreator<
  T extends GrammarCardData | ReadingCardData,
  K extends keyof T
>(
  data: T[],
  onRate: (
    label: string[] | string | number | null | (string & string[]),
    ratingIndex: number,
  ) => void,
  tabLabels: K[],
  label: K,
) {
  const createdSlides = data.map((el) => {
    return el.cardType === 'grammar' ? (
      <SwiperSlide key={`slide-grammar-${el.id}`} tag="li">
        <CardGrammar
          cardData={el as GrammarCardData}
          onRate={onRate}
          tabLabels={tabLabels}
          label={label}
        />
      </SwiperSlide>
    ) : el.cardType === 'reading' ? (
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

const SliderContainer = <
  T extends GrammarCardData | ReadingCardData,
  K extends keyof T
>({
  data,
  onRate,
  tabLabels,
  label,
  cardType,
}: SliderContainerProps<T, K>) => {
  const slides = slidesCreator(data, onRate, tabLabels, label);
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
