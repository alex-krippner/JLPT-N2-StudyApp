import React from 'react';
import styled from 'styled-components';
import SwiperCore, { Pagination } from 'swiper';
import { connect } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import PropTypes from 'prop-types';

import CardGrammar from '../card/cardGrammar.component';
import CardReading from '../card/cardReading.component';
import { deleteCard } from '../../redux/utils.actionCreator';
import AddCardPopover from '../card/addCardPopover.component';

const SliderContainerStyled = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  padding: 0 6rem;
`;

SwiperCore.use([Pagination]);

const SliderContainer = ({
  data,
  onRate,
  tabLabels,
  label,
  cardType,
}) => {
  const slides = data.map((el, index) => {
    if (cardType === 'grammar')
      return (
        <SwiperSlide key={`slide-${uuidv4()}`} tag="li">
          <CardGrammar
            cardData={el}
            key={el}
            index={index}
            rating={el.rating}
            onRate={onRate}
            tabLabels={tabLabels}
            label={label}
          />
        </SwiperSlide>
      );

    return (
      <SwiperSlide key={`slide-${uuidv4()}`} tag="li">
        <CardReading
          cardData={el}
          key={el}
          index={index}
          rating={el.rating}
          onRate={onRate}
          tabLabels={tabLabels}
          label={label}
        />
      </SwiperSlide>
    );
  });

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
        grabCursor="true"
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
const mapDispatchToProps = (dispatch) => ({
  deleteCardDispatcher: (card, cardId) =>
    dispatch(deleteCard(card, cardId)),
});

export default connect(null, mapDispatchToProps)(SliderContainer);

SliderContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRate: PropTypes.func.isRequired,
  tabLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
  cardType: PropTypes.string.isRequired,
};
