/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */

import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

import CardMenu from './cardMenu.component';
import Star from './star.component';

const CardScene = styled.div.attrs((props) => ({
  height:
    props.cardType === 'vocab'
      ? '45rem'
      : props.cardType === 'kanji'
      ? '40rem'
      : '55rem',
  width:
    props.cardType === 'vocab'
      ? '35rem'
      : props.cardType === 'kanji'
      ? '30rem'
      : '85rem',
}))`
  height: ${(props) => props.height};
  perspective: 200rem;
  -moz-perspective: 150rem;
  width: ${(props) => props.width};
  user-select: none;
`;
const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;
  color: var(--color-grey-medium);
`;

const CardSide = styled.div.attrs((props) => ({
  fontSize:
    props.cardType === 'vocab' || props.cardType === 'grammar'
      ? 'var(--font-size-large)'
      : 'var(--font-size-huge)',
}))`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  backface-visibility: hidden;
  border-radius: 1rem;
  transition: transform 0.8s ease, background 0.8s ease;
  background-color: var(--color-white);
  border: solid 1px #708090;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);

  font-size: ${(props) =>
    props.front ? props.fontSize : 'var(--font-size-medium)'};
  transform: ${(props) =>
    props.back ? ' rotateY(180deg)' : 'rotateY(0)'};
  cursor: ${(props) => (props.back ? 'pointer' : '')};

  .top {
    position: absolute;
    top: 1rem;
    left: 1rem;
    padding: 5px;
    font-size: 2rem;
    text-transform: capitalize;
  }

  .bottom {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 80%;
    margin: 0;

    .sentenceWrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      height: 100%;
      margin: 0;
      padding: 1rem;
      font-size: 1.75rem;
    }

    .paragraph {
      display: flex;
      align-items: center;
      margin: 0;
    }
  }

  .dot {
    display: inline-block;
    height: 1rem;
    width: 1rem;
    margin-right: 1rem;
    border-radius: 50%;
    border: solid 1px #708090;
    background-color: var(--color-white);
  }
`;

const Front = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .menu-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`;

const FrontData = styled.div`
  cursor: pointer;
  text-align: center;
  width: 75%;
  display: flex;
  line-height: 2;
  font-size: 1.75rem;
`;

const Rating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  border-top: solid 1px;
  z-index: 99;
`;

const BackSection = styled.section.attrs((props) => ({
  height: props.section === 0 ? '15%' : '45%',

  borderBottom: () => {
    if (props.section < props.labelNum - 1) return 'solid 1px';
  },
}))`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 2.5rem;
  border-bottom: ${(props) => props.borderBottom};
  height: ${(props) => props.height};
`;

const FrontContent = ({ cardData }) => {
  if (cardData.cardType === 'reading') return cardData.passage;
};

const useStyles = makeStyles({
  AppBarRoot: {
    boxShadow: 'none',
    width: 'auto',
    background: 'transparent',
    left: 0,
    color: 'var(--color-green-light)',
  },

  tab: {
    fontSize: 'var(--font-size-small)',
  },
});

const CardReading = ({
  cardData,
  flipCard,
  onRate,
  tabLabels,
  cardFormData,
  formDispatcher,
  label,
}) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <CardScene cardType={cardData.cardType}>
      <CardWrapper className="cardWrapper" id={cardData.id}>
        <AppBar classes={{ root: classes.AppBarRoot }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab className={classes.tab} label="Item One" />
            <Tab className={classes.tab} label="Item Two" />
          </Tabs>
        </AppBar>
        <CardSide
          front
          cardType={cardData.cardType}
          className="card-side"
        >
          <Front>
            <CardMenu
              front={cardData[label]}
              cardId={cardData.id}
              cardFormData={cardFormData}
              formDispatcher={formDispatcher}
              label={label}
              tabLabels={tabLabels}
              cardData={cardData}
            />

            <FrontData onClick={() => flipCard(cardData.id)}>
              <FrontContent cardData={cardData} />
            </FrontData>
          </Front>
          <Rating>
            {[...Array(3)].map((cur, i) => (
              <Star
                key={uuidv4()}
                selected={i < cardData.rating}
                onClick={
                  () =>
                    onRate(cardData[label], cardData.cardType, i + 1)
                  // eslint-disable-next-line react/jsx-curly-newline
                }
              />
            ))}
          </Rating>
        </CardSide>
        <CardSide
          back
          onClick={() => flipCard(cardData.id)}
          className="card-side"
        >
          {tabLabels.map((tabLabel, idx) => {
            return (
              <BackSection
                key={uuidv4()}
                section={idx}
                labelNum={tabLabels.length}
              >
                <div className="top">
                  {tabLabel === 'answerChoices'
                    ? 'Choose wisely:'
                    : tabLabel}
                </div>
                <div className="bottom">
                  <div className="sentenceWrapper">
                    {cardData[tabLabel].map((el) => (
                      <div className="paragraph" key={uuidv4()}>
                        <span className="dot">&nbsp;</span>
                        <div>{el}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </BackSection>
            );
          })}
        </CardSide>
      </CardWrapper>
    </CardScene>
  );
};

export default CardReading;
