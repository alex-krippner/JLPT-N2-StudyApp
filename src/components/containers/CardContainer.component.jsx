import React from 'react';
import PropTypes from 'prop-types';

import { Flipper, Flipped } from 'react-flip-toolkit';
import { v4 as uuidv4 } from 'uuid';

import Card from '../card/card.component';
import CardForm from '../card/cardForm.component';
import { CardsContainerStyled } from '../../theme/styledComponents';

const CardContainer = (props) => {
  let flipId = '';
  const { data, label, inputValue, tabLabels, onRate } = props;
  flipId += data.map((x) => x.id).join('');

  return (
    <Flipper flipKey={flipId} spring="stiff">
      <CardsContainerStyled>
        <CardForm
          label={label}
          inputValue={inputValue}
          tabLabels={tabLabels}
          cardData={data}
        />

        {data.map((el) => (
          <Flipped key={uuidv4()} flipId={el.id}>
            <div>
              <Card
                cardData={el}
                tabLabels={tabLabels}
                label={label}
                inputValue={inputValue}
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

CardContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRate: PropTypes.func.isRequired,
  tabLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
};
