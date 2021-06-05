import React from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';

import CardsContainer from '../containers/CardsContainer';

// TODO: correct card form component type after migrating all forms
interface CardContainerProps<T, K> {
  data: T[];
  label: CardLabels;
  tabLabels: K[];
  onRate: (label: string, ratingIndex: number) => void;
  CardComponent: React.ElementType;
  CardFormComponent?: any;
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
  CardFormComponent,
}: CardContainerProps<T, K>) => {
  let flipId = '';
  flipId += data.map((x: CardDataType) => x.id).join('');

  return (
    <Flipper flipKey={flipId} spring="stiff">
      <CardsContainer>
        {CardFormComponent}

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
