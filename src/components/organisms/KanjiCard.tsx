import React, { useRef } from 'react';
import { Box } from '@material-ui/core';
import FlipCard from '../molecules/FlipCard';
import CardSide from '../atoms/CardSide';
import CardMenu from '../card/CardMenu';
import RatingContainer from '../atoms/RatingContainer';
import Rating from '../Rating';
import CardSection from '../atoms/Section';

const KanjiCard = <T extends KanjiCardData, K extends TabLabel>({
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
    <FlipCard cardRef={cardToFlip} cardData={cardData}>
      <CardSide
        fontSize="var(--font-size-large)"
        transform="rotateY(0)"
      >
        <Box
          position="relative"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CardMenu
            front={cardData.mainContent}
            cardId={cardData.id}
            label={label}
            tabLabels={tabLabels}
            cardData={cardData}
          />{' '}
          <Box
            display="flex"
            flex="0 0 80%"
            alignItems="center"
            textAlign="center"
            style={{ cursor: 'pointer' }}
          >
            {cardData.mainContent}
          </Box>
        </Box>
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
      </CardSide>
      <CardSide
        transform="rotateY(180deg)"
        cursor="pointer"
        onClick={() => handleFlip(cardToFlip)}
      >
        {tabLabels.map((tabLabel, idx: number) => {
          return (
            <CardSection
              // @ts-ignore
              key={cardData[tabLabel]}
              // @ts-ignore
              dataArray={cardData[tabLabel]}
              tabLabel={tabLabel}
              borderBottom={idx === tabLabels.length - 1 ? 0 : 1}
              position="relative"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
            />
          );
        })}
      </CardSide>
    </FlipCard>
  );
};

export default KanjiCard;
