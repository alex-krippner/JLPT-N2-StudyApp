/* eslint-disable consistent-return */

import React, { useImperativeHandle, useRef } from 'react';
import { DragSource, DropTarget } from 'react-dnd';

import Card from '../card.component';
import Types from './constants';

const cardSource = {
  beginDrag(props) {
    const { item, index } = props;
    item.index = index;
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

// Specify which props to inject into the component
// https://react-dnd.github.io/react-dnd/docs/api/drag-source#the-collecting-function

function collect(connect, monitor) {
  return {
    // Call this function inside render() to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDraggin: monitor.isDragging(),
    getItem: monitor.getItem(),
  };
}

const DragItem = React.forwardRef(
  ({ card, getItem, connectDragSource, connectDropTarget }, ref) => {
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);
    let draggedId = null;
    if (getItem !== null) draggedId = getItem.id;

    const dragClass = draggedId === card.id ? 'draggedItem' : '';

    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current,
    }));
    return (
      <div ref={elementRef} className={dragClass}>
        <Card />
      </div>
    );
  },
);

export default DropTarget(
  Types.CARDS,
  cardTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.DropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  }),
)(DragSource(Types.CARDS, cardSource, collect)(DragItem));
