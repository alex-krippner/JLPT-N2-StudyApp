import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';
import 'swiper/swiper.scss';

import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { makeStyles } from '@material-ui/core/styles';

import Card from './card.component';
import { flipCard } from './components.utils';

import { CardFormContext } from '../context/context';

import CardForm from './cardForm.component';

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
    fontSize: '3.5rem',

    '&:hover': {
      cursor: 'pointer',
    },
  },
});

function SimplePopover({
  tabLabels,
  cardFormData,
  formDispatcher,
  label,
  inputValue,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = () => {
    setAnchorEl(document.getElementById('main'));
    [...document.getElementsByClassName('card-side')].forEach((el) =>
      el.setAttribute('style', 'background: rgba(0,0,0,0.4)'),
    );
  };

  const handleClose = () => {
    setAnchorEl(null);
    [...document.getElementsByClassName('card-side')].forEach((el) =>
      el.setAttribute('style', 'background: inheret'),
    );
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
        <CardFormContext.Provider
          value={{ cardFormData, formDispatcher }}
        >
          <CardForm
            label={label}
            inputValue={inputValue}
            tabLabels={tabLabels}
            cardType="grammar"
          />
        </CardFormContext.Provider>
      </Popover>
    </div>
  );
}

const SliderContainer = ({
  data,
  onRate,
  tabLabels,
  cardFormData,
  formDispatcher,
  label,
  inputValue,
}) => {
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
      <SimplePopover
        tabLabels={tabLabels}
        cardFormData={cardFormData}
        formDispatcher={formDispatcher}
        label={label}
        inputValue={inputValue}
      />

      <Swiper
        id="main"
        grabCursor="true"
        spaceBetween={3}
        slidesPerView={1}
        onClick={(swiper) => swiper.setGrabCursor()}
      >
        {slides}{' '}
      </Swiper>
    </SliderContainerStyled>
  );
};

export default SliderContainer;
