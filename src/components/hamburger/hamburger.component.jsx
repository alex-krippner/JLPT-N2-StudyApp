import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledBurger = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  background-color: var(--color-white-medium);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 99;

  &:focus {
    outline: none;
  }

  div {
    position: relative;
    width: 2rem;
    height: 0.25rem;
    margin: 0.15rem 0;
    background-color: var(--color-primary-dark);
    border-radius: 1rem;
    transition: all 0.3s linear;
    transform-origin: 1px;
  }

  @media only screen and (max-width: 430px) {
    display: flex;
  }
`;

const Hamburger = (props) => {
  const { open, handleOpen } = props;
  return (
    <StyledBurger open={open} onClick={handleOpen}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

Hamburger.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default Hamburger;
