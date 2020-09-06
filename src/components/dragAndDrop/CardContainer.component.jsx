/* eslint-disable no-useless-return */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
import React from 'react';

import { Flipper, Flipped } from 'react-flip-toolkit';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import Card from '../card.component';
import CardForm from '../cardForm.component';
import { CardFormContext } from '../../context/context';

import { flipCard } from '../components.utils';

const CardsContainerStyled = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  grid-gap: 30px;
  height: 100%;
  width: 100%;
  padding: 3rem;
`;

const CardContainer = (props) => {
  let flipId = '';
  const {
    data,
    label,
    inputValue,
    tabLabels,
    cardFormData,
    formDispatcher,
    onRate,
  } = props;
  flipId += data.map((x) => x.id).join('');

  return (
    <Flipper flipKey={flipId} spring="stiff">
      <CardsContainerStyled>
        <CardFormContext.Provider
          value={{ cardFormData, formDispatcher }}
        >
          <CardForm
            label={label}
            inputValue={inputValue}
            tabLabels={tabLabels}
            cardData={data}
          />
        </CardFormContext.Provider>

        {data.map((el) => (
          <Flipped key={uuidv4()} flipId={el.id}>
            <div>
              <Card
                cardData={el}
                flipCard={flipCard}
                tabLabels={tabLabels}
                cardFormData={cardFormData}
                formDispatcher={formDispatcher}
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
