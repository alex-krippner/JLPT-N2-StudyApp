import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import styled from 'styled-components';

import Star from './star.component';

const CardScene = styled.div.attrs((props) => ({
  style: {
    transition: props.isDragging ? 'none' : 'all 500ms',
  },
}))`
  height: ${({ height }) => height}px;
  perspective: 80rem;
  -moz-perspective: 150rem;
  width: 30rem;
  user-select: none;

  position: absolute;
  top: ${({ top }) => 100 + top}px;
  left: calc(50% - 150px);
`;
const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;
  color: #708090;
`;

const CardSide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  backface-visibility: hidden;
  border-radius: 1rem;
  transition: all 0.8s ease;
  background-color: #ffffff;
  border: solid 1px #708090;
  font-size: ${(props) => (props.front ? '15rem' : '2rem')};
  transform: ${(props) =>
    props.back ? ' rotateY(180deg)' : 'rotateY(0)'};
  cursor: ${(props) => (props.back ? 'pointer' : '')};

  .top {
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px;
    border-right: solid 1px;
    border-bottom: solid 1px;
    font-size: 2rem;
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
    background-color: #ffffff;
  }
`;

const Front = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const FrontData = styled.div`
  cursor: pointer;
`;

const Rating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  border-top: solid 1px;
  z-index: 99;
`;

const BackTop = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30%;
  border-bottom: solid 1px;
  font-size: 2.5rem;
`;

const BackMid = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30%;
  border-bottom: solid 1px;
  font-size: 3rem;
`;

const BackBtm = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 40%;
`;

const Card = ({
  front,
  backTop,
  backMid,
  backBtm,
  id,
  flipCard,
  rating,
  rateData,
  isDragging,
  top,
  height,
}) => {
  return (
    <CardScene isDragging={isDragging} height={height} top={top}>
      <CardWrapper className="cardWrapper" id={id}>
        <CardSide front>
          <Front>
            <FrontData onClick={() => flipCard(id)}>
              {front}
            </FrontData>
          </Front>
          <Rating>
            {[...Array(3)].map((cur, i) => (
              <Star
                key={uuidv4()}
                selected={i < rating}
                onClick={() => rateData(front, i + 1)}
              />
            ))}
          </Rating>
        </CardSide>
        <CardSide back onClick={() => flipCard(id)}>
          <BackTop>
            <div className="top">読み</div>
            <div className="bottom">
              <div className="sentenceWrapper">
                {backTop.map((el) => (
                  <div className="paragraph" key={uuidv4()}>
                    <span className="dot">&nbsp;</span>
                    <div>{el}</div>
                  </div>
                ))}
              </div>
            </div>{' '}
          </BackTop>

          <BackMid>
            <div className="top">単語例</div>
            <div className="bottom">
              <div className="sentenceWrapper">
                {backMid.map((el) => (
                  <div className="paragraph" key={uuidv4()}>
                    <span className="dot">&nbsp;</span>
                    <div>{el}</div>
                  </div>
                ))}
              </div>
            </div>
          </BackMid>
          <BackBtm>
            <div className="top">用例</div>
            <div className="bottom">
              <div className="sentenceWrapper">
                {backBtm.map((el) => (
                  <div className="paragraph" key={uuidv4()}>
                    <span className="dot">&nbsp;</span>
                    <div>{el}</div>
                  </div>
                ))}
              </div>
            </div>
          </BackBtm>
        </CardSide>
      </CardWrapper>
    </CardScene>
  );
};

export default Card;
