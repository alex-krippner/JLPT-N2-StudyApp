import dragDropActionTypes from './dragDrop.actionTypes';
import { handleMouseDown, handleMouseMove } from './dragDrop.utils';

const INITIAL_STATE = {
  isDragging: false,
  originalCoords: { X: 0, Y: 0 },
  translateX: 0,
  translateY: 0,
  lastTranslateX: 0,
  lastTranslateY: 0,
};

const dragDropReducer = (state = INITIAL_STATE, action) => {
  switch (action.types) {
    case dragDropActionTypes.MOUSE_DOWN:
      return {
        ...state,
        isDragging: true,
        originalCoords: handleMouseDown(
          action.payload.clientX,
          action.payload.clientY,
        ),
      };
    default:
      return state;
  }
};

export default dragDropReducer;
