import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import CardMenu from './cardMenu.component';
import Rating from '../rating.component';
import { cardKanjiVocabStyles } from '../../theme/styledComponents';
import * as utils from '../../utils/utilitiesFunctions';

const {
  CardSceneSmall,
  CardWrapper,
  CardSideSmall,
  Front,
  FrontDataSmall,
  BackSectionSmall,
  RatingContainer,
} = cardKanjiVocabStyles;

const FrontContent = ({ cardData }) =>
  cardData.cardType === 'kanji' ? cardData.漢字 : cardData.語彙;

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
    <CardSceneSmall cardType={cardData.cardType}>
      <CardWrapper
        className="cardWrapper"
        ref={cardToFlip}
        id={cardData.id}
      >
        <CardSideSmall
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

            <FrontDataSmall onClick={() => handleFlip(cardToFlip)}>
              <FrontContent cardData={cardData} />
            </FrontDataSmall>
          </Front>
          <RatingContainer>
            {[...Array(3)].map((cur, i) => (
              <Rating
                // eslint-disable-next-line react/no-array-index-key
                key={cardData.id + i}
                selected={i < cardData.rating}
                onClick={() => onRate(cardData[label], i + 1)}
              />
            ))}
          </RatingContainer>
        </CardSideSmall>
        <CardSideSmall
          back
          onClick={() => handleFlip(cardToFlip)}
          className="card-side"
        >
          {tabLabels.map((tabLabel, idx) => {
            return (
              <BackSectionSmall
                key={tabLabel}
                section={idx}
                labelNum={tabLabels.length}
              >
                <div className="top">{tabLabel}</div>
                <div className="bottom">
                  <div className="sentenceWrapper">
                    {cardData[tabLabel].map((el) => (
                      <div className="paragraph" key={el}>
                        <span className="dot">&nbsp;</span>
                        <div>{el}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </BackSectionSmall>
            );
          })}
        </CardSideSmall>
      </CardWrapper>
    </CardSceneSmall>
  );
};

export default React.memo(Card, (prevProps, nextProps) =>
  utils.compareProps(prevProps, nextProps),
);

Card.propTypes = {
  cardData: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.number,
    ]),
  ).isRequired,
  onRate: PropTypes.func.isRequired,
  tabLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
};
