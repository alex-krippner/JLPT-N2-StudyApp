import React, { useCallback, useState } from 'react';
import { range, inRange } from 'lodash';
import styled from 'styled-components';

export const CardsContainerStyled = styled.div`
  height: 100vh;
  width: 100wh;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.6);
`;

const HEIGHT = 360;
const MAX = 12;

const CardsContainer = ({ children }) => {
  const items = range(MAX);
  const [state, setState] = useState({
    order: items,
    dragOrder: items,
    draggedIndex: null,
  });

  const handleDrag = useCallback(
    ({ translation, id }) => {
      const delta = Math.round(translation.y / HEIGHT);
      const index = state.order.indexOf(id);
      const dragOrder = state.order.filter((i) => i !== id);
      if (!inRange(index + delta, 0, items.length)) {
        return;
      }

      dragOrder.splice(index + delta, 0, id);

      setState((prevState) => ({
        ...prevState,
        draggedIndex: id,
        dragOrder,
      }));
    },
    [state.order, items.length],
  );

  const handleDragEnd = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      order: prevState.dragOrder,
      draggedIndex: null,
    }));
  }, []);
  const { draggedIndex, dragOrder, order } = state;

  return (
    <>
      {children(
        HEIGHT,
        MAX,
        draggedIndex,
        dragOrder,
        order,
        handleDrag,
        handleDragEnd,
      )}
    </>
  );
};

export default CardsContainer;
