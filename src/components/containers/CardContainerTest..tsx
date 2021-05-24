import React from 'react';

import { Flipper, Flipped } from 'react-flip-toolkit';

import CardForm from '../cardForm/CardForm';
import { CardsContainerStyled } from '../../theme/styledComponents';

interface CardContainerProps<T, K> {
  data: T[];
  label: CardLabels;
  tabLabels: K[];
  onRate: (label: string, ratingIndex: number) => void;
  CardComponent: React.ElementType;
}

const CardContainerTest = <
  T extends KanjiCardData | VocabCardData,
  K extends TabLabel
>({
  data,
  label,
  tabLabels,
  onRate,
  CardComponent,
}: CardContainerProps<T, K>) => {
  let flipId = '';
  flipId += data.map((x: CardDataType) => x.id).join('');

  return (
    <Flipper flipKey={flipId} spring="stiff">
      <CardsContainerStyled>
        <CardForm
          label={label}
          tabLabels={tabLabels}
          cardData={data}
        />

        {data.map((el) => (
          <Flipped key={el.id} flipId={el.id}>
            <div>
              <CardComponent
                cardData={el}
                tabLabels={tabLabels}
                label={label}
                onRate={onRate}
              />
            </div>
          </Flipped>
        ))}
      </CardsContainerStyled>
    </Flipper>
  );
};

export default CardContainerTest;
