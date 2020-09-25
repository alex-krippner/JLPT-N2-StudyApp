/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled, { css } from 'styled-components';

export default class Draggable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragging: false,

      originalX: 0,
      originalY: 0,

      translation: { x: 0, y: 0 },

      lastTranslateX: 0,
      lastTranslateY: 0,
    };
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown = ({ clientX, clientY }) => {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
    const { onDragStart } = this.props;

    if (onDragStart) {
      onDragStart();
    }

    this.setState({
      originalX: clientX,
      originalY: clientY,
      isDragging: true,
    });
  };

  handleMouseMove = ({ clientX, clientY }) => {
    const { isDragging } = this.state;
    const { onDrag, id } = this.props;
    const translation = {
      x: clientX - this.state.originalX,
      y: clientY - this.state.originalY,
    };
    if (!isDragging) {
      return;
    }

    this.setState((prevState) => ({
      ...prevState,
      translation,
    }));

    onDrag({ translation, id });
  };

  handleMouseUp = () => {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    const { onDragEnd } = this.props;

    this.setState(
      () => {
        return {
          originalX: 0,
          originalY: 0,
          translation: { x: 0, y: 0 },

          isDragging: false,
        };
      },
      () => {
        if (onDragEnd) {
          onDragEnd();
        }
      },
    );

    onDragEnd();
  };

  render() {
    const { children } = this.props;
    const { translation, isDragging } = this.state;
    return (
      <Container
        onMouseDown={this.handleMouseDown}
        x={translation.x}
        y={translation.y}
        isDragging={isDragging}
      >
        {children}
      </Container>
    );
  }
}

const Container = styled.div.attrs((props) => ({
  style: {
    transform: `translate(${props.x}px, ${props.y}px)`,
  },
}))`
  cursor: grab;
  ${({ isDragging }) =>
    isDragging
      ? css`
          opacity: 0.8;
          z-index: 2;
          cursor: grabbing;
        `
      : css`
          transition: transform 0.5s;
        `};
`;
