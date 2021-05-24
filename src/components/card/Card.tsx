import React, { useRef } from 'react';
import { Box } from '@material-ui/core';
import CardMenu from './CardMenu';
import Rating from '../Rating';
import { cardKanjiVocabStyles } from '../../theme/styledComponents';
import * as utils from '../../utils/utilitiesFunctions';
import CardSection from '../atoms/Section';

const {
  CardSceneSmall,
  CardWrapper,
  CardSideSmall,
  Front,
  FrontDataSmall,
  RatingContainer,
} = cardKanjiVocabStyles;

const Card = <
  T extends VocabCardData | KanjiCardData,
  K extends TabLabel
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
          {tabLabels.map((tabLabel, idx: number) => {
            return (
              <CardSection
                // @ts-ignore
                key={cardData[tabLabel] + idx}
                // @ts-ignore
                borderBottom={idx === tabLabels.length - 1 ? 0 : 1}
                position="relative"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
              >
                <div className="top">{tabLabel}</div>
                <div className="bottom">
                  <div className="sentenceWrapper">
                    {/* @ts-ignore */}
                    {cardData[tabLabel].map((el: string) => (
                      <div className="paragraph" key={el}>
                        <span className="dot">&nbsp;</span>
                        <div>{el}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardSection>
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
