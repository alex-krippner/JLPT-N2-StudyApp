import React from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';

import CardForm from '../organisms/CardForm';
import CardsContainer from '../containers/CardsContainer';

interface CardContainerProps<T, K> {
  data: T[];
  label: CardLabels;
  tabLabels: K[];
  onRate: (label: string, ratingIndex: number) => void;
  CardComponent: React.ElementType;
}

const CardsContainerTemplate = <
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
      <CardsContainer>
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
      </CardsContainer>
    </Flipper>
  );
};

export default CardsContainerTemplate;
