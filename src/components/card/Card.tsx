import React, { useRef } from 'react';
import CardMenu from './CardMenu';
import Rating from '../Rating';
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

const Card = <
  T extends VocabCardData | KanjiCardData,
  K extends keyof T
>({
  cardData,
  onRate,
  tabLabels,
  label,
}: CardProps<T, K>) => {
  const cardToFlip = useRef(null);

  const handleFlip = (
    cardRef: React.MutableRefObject<any> | null,
  ) => {
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
              front={cardData.mainContent}
              cardId={cardData.id}
              label={label}
              tabLabels={tabLabels}
              cardData={cardData}
            />

            <FrontDataSmall onClick={() => handleFlip(cardToFlip)}>
              <div>{cardData.mainContent}</div>
            </FrontDataSmall>
          </Front>
          <RatingContainer>
            {[...Array(3)].map((cur, i) => (
              <Rating
                // eslint-disable-next-line react/no-array-index-key
                key={cardData.id + i}
                selected={i < cardData.rating}
                onClick={() => onRate(cardData.mainContent, i + 1)}
              />
            ))}
          </RatingContainer>
        </CardSideSmall>
        <CardSideSmall
          back
          onClick={() => handleFlip(cardToFlip)}
          className="card-side"
        >
          {tabLabels.map((tabLabel: K, idx) => {
            const cardEntries = (cardData[
              tabLabel
            ] as unknown) as Array<any>;
            return (
              <BackSectionSmall
                key={cardData.id}
                section={idx}
                labelNum={tabLabels.length}
              >
                <div className="top">{tabLabel}</div>
                <div className="bottom">
                  <div className="sentenceWrapper">
                    {cardEntries.map((el: string) => (
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
