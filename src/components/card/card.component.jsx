/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */

import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import CardMenu from './cardMenu.component';
import Rating from '../rating.component';

const CardScene = styled.div.attrs((props) => ({
  height:
    props.cardType === 'vocab'
      ? '45rem'
      : props.cardType === 'kanji'
      ? '40rem'
      : '90%',
  width:
    props.cardType === 'vocab'
      ? '35rem'
      : props.cardType === 'kanji'
      ? '30rem'
      : '75rem',
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
  color: var(--color-primary-dark);
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
    props.front ? props.fontSize : 'var(--font-size-small)'};
  transform: ${(props) =>
    props.back ? ' rotateY(180deg)' : 'rotateY(0)'};
  cursor: ${(props) => (props.back ? 'pointer' : '')};

  .top {
    padding: 5px;
    border-right: solid 1px;
    border-bottom: solid 1px;
    font-size: var(--font-size-small);
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
      justify-content: space-around;
      align-items: flex-start;
      height: 100%;
      margin: 0;
      padding: 1rem;

      font-size: var(--font-size-small);
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const FrontData = styled.div`
  flex: 0 0 80%;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-align: center;
`;

const RatingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: min-content;
  z-index: 99;
`;

const BackSection = styled.section.attrs((props) => ({
  // height: props.section === 0 ? '15%' : '45%',

  borderBottom: () => {
    if (props.section < props.labelNum - 1) return 'solid 1px';
  },
}))`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: var(--font-size-medium);
  border-bottom: ${(props) => props.borderBottom};
  height: min-content;
`;

const FrontContent = ({ cardData }) => {
  if (cardData.cardType === 'kanji') return cardData.漢字;
  if (cardData.cardType === 'grammar') return cardData.文法;
  if (cardData.cardType === 'vocab') return cardData.語彙;
  if (cardData.cardType === 'reading') return cardData.passage;
};

const Card = ({
  cardData,
  onRate,
  tabLabels,
  cardFormData,
  formDispatcher,
  label,
}) => {
  const cardToFlip = useRef(null);

  const handleFlip = (cardRef) => {
    const { current } = cardRef;

    if (!current.style.transform) {
      current.style.transform = 'rotateY(180deg)';
    } else if (current.style.transform) {
      current.style.transform = '';
    }
  };

  return (
    <CardScene cardType={cardData.cardType}>
      <CardWrapper
        className="cardWrapper"
        ref={cardToFlip}
        id={cardData.id}
      >
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

            <FrontData onClick={() => handleFlip(cardToFlip)}>
              <FrontContent cardData={cardData} />
            </FrontData>
          </Front>
          <RatingContainer>
            {[...Array(3)].map((cur, i) => (
              <Rating
                key={uuidv4()}
                selected={i < cardData.rating}
                onClick={() =>
                  onRate(cardData[label], cardData.cardType, i + 1)
                }
              />
            ))}
          </RatingContainer>
        </CardSide>
        <CardSide
          back
          onClick={() => handleFlip(cardToFlip)}
          className="card-side"
        >
          {tabLabels.map((tabLabel, idx) => {
            return (
              <BackSection
                key={uuidv4()}
                section={idx}
                labelNum={tabLabels.length}
              >
                <div className="top">{tabLabel}</div>
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

export default Card;
