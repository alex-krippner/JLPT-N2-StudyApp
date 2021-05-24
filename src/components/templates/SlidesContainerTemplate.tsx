import React from 'react';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';

import AddCardPopover from '../molecules/AddCardPopover';
import SlidesContainer from '../containers/SlidesContainer';

SwiperCore.use([Pagination]);

type SliderContainerProps<T, K> = {
  data: T[];
  cardType: CardType;
  onRate: (
    label: string[] | string | number | null | (string & string[]),
    ratingIndex: number,
  ) => void;
  tabLabels: K[];
  label: CardLabels;
  CardComponent: React.ElementType;
};

const SlidesContainerTemplate = <
  T extends GrammarCardData | ReadingCardData,
  K extends TabLabel
>({
  data,
  onRate,
  tabLabels,
  label,
  cardType,
  CardComponent,
}: SliderContainerProps<T, K>) => {
  return (
    <SlidesContainer>
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
        {data.map((el) => {
          return (
            <SwiperSlide key={`slide-${el.id}`} tag="li">
              <CardComponent
                cardData={el}
                onRate={onRate}
                tabLabels={tabLabels}
                label={label}
              />
            </SwiperSlide>
          );
        })}
        <div className="swiper-pagination" />
      </Swiper>
    </SlidesContainer>
  );
};

export default SlidesContainerTemplate;
