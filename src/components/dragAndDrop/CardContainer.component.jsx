/* eslint-disable no-useless-return */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import arrayMove from 'array-move';
import produce from 'immer';

import CardsContainerStyled from '../cardsContainer.component';
import CardForm from '../cardForm.component';
import DragCard from './DragCard';

class CardContainer extends Component {
  constructor(props) {
    super(props);

    const { data } = this.props;

    this.state = { data: [...data] };
  }

  moveCard = (dragIndex, hoverIndex) => {
    this.setState(
      // eslint-disable-next-line react/no-access-state-in-setstate
      produce(this.state, (draft) => {
        // eslint-disable-next-line no-param-reassign
        draft.data = arrayMove(draft.data, dragIndex, hoverIndex);
      }),
    );
  };

  rateCard = (kanji, rating) => {
    const { onRate } = this.props;
    this.setState((state) => {
      const data = state.data.map((k) => {
        return k.kanji !== kanji
          ? k
          : {
              ...k,
              rating: k.rating === rating ? rating - 1 : rating,
            };
      });

      return {
        data,
      };
    });

    onRate(kanji, rating);
  };

  render() {
    let flipId = '';
    const { data } = this.state;

    flipId += data.map((x) => x.id).join('');
    return (
      <Flipper flipKey={flipId} spring="stiff">
        <CardsContainerStyled>
          <CardForm />
          {data.map((el, index) => (
            <Flipped key={el.id} flipId={el.id}>
              <div>
                <DragCard
                  cardData={el}
                  key={el.id}
                  index={index}
                  moveCard={this.moveCard}
                  rating={el.rating}
                  onRate={this.rateCard}
                />
              </div>
            </Flipped>
          ))}
        </CardsContainerStyled>
      </Flipper>
    );
  }
}
export default CardContainer;
