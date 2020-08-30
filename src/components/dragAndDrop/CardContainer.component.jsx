/* eslint-disable no-useless-return */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import arrayMove from 'array-move';
import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';

import CardsContainerStyled from '../cardsContainer.component';
import CardForm from '../cardForm.component';
import DragCard from './DragCard';
import { CardFormContext } from '../../context/context';

class CardContainer extends Component {
  constructor(props) {
    super(props);

    // collection data (ie. kanji/vocab/grammar collection)
    // copied from redux store  to create draggable cards
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

  rateCard = (cardContent, cardType, rating) => {
    const { onRate } = this.props;

    // update rating of local cardData copy

    this.setState((state) => {
      let data;
      if (cardType === 'kanji')
        data = state.data.map((k) => {
          return k.kanji !== cardContent
            ? k
            : {
                ...k,
                rating: k.rating === rating ? rating - 1 : rating,
              };
        });

      if (cardType === 'vocab');
      data = state.data.map((k) => {
        return k.kana !== cardContent
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
    // dispatch rating to redux store
    onRate(cardContent, rating);
  };

  render() {
    let flipId = '';
    const { data } = this.state;
    const {
      label,
      inputValue,
      tabLabels,
      cardFormData,
      formDispatcher,
    } = this.props;
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
            />
          </CardFormContext.Provider>

          {data.map((el, index) => (
            <Flipped key={uuidv4()} flipId={el.id}>
              <div>
                <DragCard
                  cardData={el}
                  key={uuidv4()}
                  index={index}
                  moveCard={this.moveCard}
                  rating={el.rating}
                  onRate={this.rateCard}
                  tabLabels={tabLabels}
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
