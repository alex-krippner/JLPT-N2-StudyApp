import React from 'react';
import { Flipper } from 'react-flip-toolkit';
import { CardsContainerStyled } from '../../theme/styledComponents';

const CardContainer = (props: any) => {
  let flipId = '';
  flipId += props.data.map((x: CardDataType) => x.id).join('');

  return (
    <Flipper flipKey={flipId} spring="stiff">
      <CardsContainerStyled />
      {props.children}
    </Flipper>
  );
};

export default CardContainer;
