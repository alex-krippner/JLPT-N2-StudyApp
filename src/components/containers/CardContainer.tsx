import React from 'react';

import { Flipper, Flipped } from 'react-flip-toolkit';

import Card from '../card/Card';
import CardForm from '../cardForm/CardForm';
import { CardsContainerStyled } from '../../theme/styledComponents';

type CardContainerProps = {
  data: CardDataType[];
  label: CardLabels;
  tabLabels: CardDataKeys[];
  onRate: (
    label: string[] | string | number | null | (string & string[]),
    ratingIndex: number,
  ) => void;
};

const CardContainer = ({
  data,
  label,
  tabLabels,
  onRate,
}: CardContainerProps) => {
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
              <Card
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

export default CardContainer;
