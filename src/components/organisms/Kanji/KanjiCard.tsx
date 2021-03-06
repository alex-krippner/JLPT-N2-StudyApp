import React, { useRef } from 'react';
import { Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import FlipCard from '../../molecules/FlipCard';
import CardSide from '../../atoms/CardSide';
import CardMenu from '../../molecules/CardMenu';
import Rating from '../../atoms/Rating';
import CardSection from '../../atoms/Section';
import Dot from '../../atoms/Dot';
import * as utils from '../../../utils/utilitiesFunctions';
import { deleteKanji } from '../../../state-management/redux/kanjiCollection.reducer';
import { KanjiForm } from './Form/KanjiForm';

const KanjiCard = <T extends KanjiCardData, K extends TabLabel>({
  cardData,
  onRate,
  tabLabels,
}: CardProps<T, K>) => {
  const dispatch = useDispatch();
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
  const handleDelete = () =>
    dispatch(deleteKanji(cardData.mainContent));

  const CardFormComponent = <KanjiForm cardData={cardData} editing />;

  return (
    <FlipCard
      cardRef={cardToFlip}
      cardData={cardData}
      height="40rem"
      width="30rem"
      perspective="200rem"
    >
      <CardSide
        fontSize="var(--font-size-huge)"
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
            cardId={cardData.id}
            CardFormComponent={CardFormComponent}
            handleDelete={handleDelete}
          />{' '}
          <Box
            display="flex"
            flex="0 0 80%"
            alignItems="center"
            textAlign="center"
            style={{ cursor: 'pointer' }}
            onClick={() => handleFlip(cardToFlip)}
          >
            {cardData.mainContent}
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="10%"
        >
          {[...Array(3)].map((cur, i) => (
            <Rating
              // eslint-disable-next-line react/no-array-index-key
              key={cardData.id + i}
              selected={i < cardData.rating}
              onClick={() => onRate(cardData.mainContent, i + 1)}
            />
          ))}
        </Box>
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
              key={cardData[tabLabel] + idx}
              borderBottom={idx === tabLabels.length - 1 ? 0 : 1}
              position="relative"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Box
                padding="5px"
                borderRight={1}
                borderBottom={1}
                fontSize="var(--font-size-small)"
              >
                {tabLabel}
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                width="100%"
                height="80%"
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-around"
                  alignItems="flex-start"
                  height="100%"
                  padding="1rem"
                  fontSize="var(--font-size-small)"
                >
                  {/* @ts-ignore */}
                  {cardData[tabLabel].map((el: string) => (
                    <Box display="flex" alignItems="center" key={el}>
                      <Dot className="dot">&nbsp;</Dot>
                      <div>{el}</div>
                    </Box>
                  ))}
                </Box>
              </Box>
            </CardSection>
          );
        })}
      </CardSide>
    </FlipCard>
  );
};

export default React.memo(KanjiCard, (prevProps, nextProps) =>
  utils.compareProps(prevProps, nextProps),
);
