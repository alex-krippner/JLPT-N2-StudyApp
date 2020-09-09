import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import SwiperCore, { Pagination } from 'swiper';
import { connect } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';

import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { makeStyles } from '@material-ui/core/styles';

import Card from './card.component';
import CardReading from './cardReading.component';
import CardForm from './cardForm.component';
import { flipCard } from './components.utils';
import { deleteCard } from '../redux/utils.actionCreator';

const SliderContainerStyled = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  padding: 0 6rem;
`;

const useStyles = makeStyles({
  root: {
    '& .MuiPaper-root': {
      borderRadius: '1rem',
    },
  },
  button: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    zIndex: 1,

    '&:hover': {
      cursor: 'pointer',
    },
  },

  addIcon: {
    fontSize: 'var(--font-size-large)',

    '&:hover': {
      cursor: 'pointer',
    },
  },
});

function SimplePopover({ tabLabels, label, cardData, cardType }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState(false);

  const changeBg = (stat) => {
    if (stat) {
      [
        ...document.getElementsByClassName('card-side'),
      ].forEach((el) =>
        el.setAttribute('style', 'background: rgba(0,0,0, 0.4);'),
      );
    } else {
      [
        ...document.getElementsByClassName('card-side'),
      ].forEach((el) =>
        el.setAttribute('style', 'background: inheret; '),
      );
    }
  };
  useLayoutEffect(() => changeBg(status));

  const handleClick = () => {
    setAnchorEl(document.getElementById('main'));
    setStatus(!status);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setStatus(!status);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={(event) => handleClick(event)}
      >
        <AddToPhotosIcon className={classes.addIcon} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        className={classes.root}
      >
        <CardForm
          label={label}
          tabLabels={tabLabels}
          cardData={cardData}
          cardType={cardType}
        />
      </Popover>
    </div>
  );
}

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
          <Card
            cardData={el}
            key={uuidv4()}
            index={index}
            rating={el.rating}
            onRate={onRate}
            tabLabels={tabLabels}
            flipCard={flipCard}
            label={label}
          />
        </SwiperSlide>
      );
    return (
      <SwiperSlide key={`slide-${uuidv4()}`} tag="li">
        <CardReading
          cardData={el}
          key={uuidv4()}
          index={index}
          rating={el.rating}
          onRate={onRate}
          tabLabels={tabLabels}
          flipCard={flipCard}
          label={label}
        />
      </SwiperSlide>
    );
  });

  return (
    <SliderContainerStyled>
      <SimplePopover
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
        <div className="swiper-pagination" />
        {slides}
      </Swiper>
    </SliderContainerStyled>
  );
};
const mapDispatchToProps = (dispatch) => ({
  deleteCardDispatcher: (card, cardId) =>
    dispatch(deleteCard(card, cardId)),
});
export default connect(null, mapDispatchToProps)(SliderContainer);
