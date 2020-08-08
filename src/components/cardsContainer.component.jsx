import styled from 'styled-components';

export const CardsContainerStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 7rem;
  padding: 1rem;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.6);
`;

export const emptyFunction = () => {};
