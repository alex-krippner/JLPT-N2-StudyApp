/* eslint-disable consistent-return */

import React, { useImperativeHandle, useRef } from 'react';
import { DragSource, DropTarget } from 'react-dnd';

import Card from '../card.component';
import Types from './constants';
import { flipCard } from '../components.utils';

// cardSource is 1/3 of required parameters for the DragSource Legacy Decorator API
const cardSource = {
  // Return the data describing the dragged item
  beginDrag(props) {
    const item = { ...props.cardData };
    item.index = props.index;
    return item;
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    if (!component) return null;

    // node = HTML Div element from imperative API
    const node = component.getNode();
    if (!node) return null;
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) return;

    // Copy dragged element dimensions
    const hoverBoundingRect = node.getBoundingClientRect();

    // Horizontal Check
    if (
      Math.abs(monitor.getClientOffset().x - hoverBoundingRect.left) >
      hoverBoundingRect.width / 1.8
    )
      return;

    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.

    // eslint-disable-next-line no-param-reassign
    monitor.getItem().index = hoverIndex;
  },
};

function collectSource(connect, monitor) {
  return {
    // Call this function inside render() to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),
    getItem: monitor.getItem(),
  };
}

const DragCard = React.forwardRef(
  (
    { cardData, getItem, connectDragSource, connectDropTarget },
    ref,
  ) => {
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);
    let draggedId = null;
    if (getItem !== null) draggedId = getItem.id;

    const dragClass = draggedId === cardData.id ? 'draggedItem' : '';

    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current,
    }));

    const {
      kanji,
      reading,
      wordSample,
      sentenceSample,
      rating,
      id,
    } = cardData;

    return (
      <div ref={elementRef} className={dragClass}>
        <Card
          item={cardData}
          front={kanji}
          backTop={reading}
          backMid={wordSample}
          backBtm={sentenceSample}
          rating={rating}
          id={id}
          flipCard={flipCard}
        />
      </div>
    );
  },
);

export default DropTarget(
  Types.CARDS,
  cardTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  }),
)(DragSource(Types.CARDS, cardSource, collectSource)(DragCard));
